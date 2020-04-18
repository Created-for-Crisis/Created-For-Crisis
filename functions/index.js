"use strict"

const functions = require("firebase-functions")
const admin = require("firebase-admin")
admin.initializeApp()
// const logging = require("@google-cloud/logging")()
const stripe = require("stripe")(functions.config().stripe.token)
const currency = functions.config().stripe.currency || "USD"
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

// [START Express App for HTTP Requests]
const app = express()
// Configure origin whitelist
app.use(
  cors({
    origin: (origin, callback) => {
      // Whitelisted Origins
      const whitelist = [
        // Development Domains
        "http://localhost:8000",
        "https://localhost:8000",
        // Created for Crisis Domains
        "https://develop.createdforcrisis.org",
        "https://www.createdforcrisis.org",
        // MasksNow Domains
        "https://staging--eloquent-montalcini-4aed93.netlify.app",
        "https://masksnow.org",
      ]

      // allow requests with no origin
      if (!origin) return callback(null, true)
      if (whitelist.indexOf(origin) === -1) {
        return callback(
          new Error(
            "The CORS policy doesn't have this origin within it's whitelist."
          ),
          false
        )
      }
      return callback(null, true)
    },
  })
)
// Parse request bodies to JSON
app.use(bodyParser.json())

// Get Payment Intent Secret for Stripe
app.post(
  "/paymentIntent",
  async ({ body: { amount, metadata = {} } }, res, next) => {
    if (!amount) {
      res.status(500).end("Invalid Amount Specified")
    } else {
      const intent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        // Verify your integration in this guide by including this parameter
        metadata: Object.assign(
          {
            integration_check: "accept_a_payment",
          },
          metadata
        ),
      })
      res.json({ client_secret: intent.client_secret })
    }
  }
)

// Expose Express API as a single Cloud Function:
exports.app = functions.https.onRequest(app)
// [END Express App for HTTP Requests]

// [START chargecustomer]
// Charge the Stripe customer whenever an amount is created in Cloud Firestore
exports.createStripeCharge = functions.firestore
  .document("stripe_customers/{userId}/charges/{id}")
  .onCreate(async (snap, context) => {
    const val = snap.data()
    try {
      // Look up the Stripe customer id written in createStripeCustomer
      const snapshot = await admin
        .firestore()
        .collection(`stripe_customers`)
        .doc(context.params.userId)
        .get()
      const snapval = snapshot.data()
      const customer = snapval.customer_id
      // Create a charge using the pushId as the idempotency key
      // protecting against double charges
      const amount = val.amount
      const idempotencyKey = context.params.id
      const charge = { amount, currency, customer }
      if (val.source !== null) {
        charge.source = val.source
      }
      const response = await stripe.charges.create(charge, {
        idempotency_key: idempotencyKey,
      })
      // If the result is successful, write it back to the database
      return snap.ref.set(response, { merge: true })
    } catch (error) {
      // We want to capture errors and render them in a user-friendly way, while
      // still logging an exception with StackDriver
      console.log(error)
      await snap.ref.set({ error: userFacingMessage(error) }, { merge: true })
      return { user: context.params.userId }
      // return reportError(error, { user: context.params.userId })
    }
  })
// [END chargecustomer]]

// When a user is created, register them with Stripe & add them to stripe_customers
exports.createStripeCustomer = functions.auth
  .user()
  .onCreate(async ({ uid, email }) => {
    const customer = await stripe.customers.create({ email: email })
    return admin
      .firestore()
      .collection("stripe_customers")
      .doc(uid)
      .set(
        {
          uid,
          email,
          customer_id: customer.id,
          roles: {},
        },
        { merge: true }
      )
  })

// Add a payment source (card) for a user by writing a stripe payment source token to Cloud Firestore
exports.addPaymentSource = functions.firestore
  .document("/stripe_customers/{userId}/tokens/{pushId}")
  .onCreate(async (snap, context) => {
    const source = snap.data()
    const token = source.token
    if (source === null) {
      return null
    }

    try {
      const snapshot = await admin
        .firestore()
        .collection("stripe_customers")
        .doc(context.params.userId)
        .get()
      const customer = snapshot.data().customer_id
      const response = await stripe.customers.createSource(customer, {
        source: token,
      })
      return admin
        .firestore()
        .collection("stripe_customers")
        .doc(context.params.userId)
        .collection("sources")
        .doc(response.fingerprint)
        .set(response, { merge: true })
    } catch (error) {
      await snap.ref.set({ error: userFacingMessage(error) }, { merge: true })
      return reportError(error, { user: context.params.userId })
    }
  })

// When a user deletes their account, clean up after them
exports.cleanupUser = functions.auth.user().onDelete(async user => {
  const snapshot = await admin
    .firestore()
    .collection("stripe_customers")
    .doc(user.uid)
    .get()
  const customer = snapshot.data()
  await stripe.customers.del(customer.customer_id)
  return admin
    .firestore()
    .collection("stripe_customers")
    .doc(user.uid)
    .delete()
})

// To keep on top of errors, we should raise a verbose error report with Stackdriver rather
// than simply relying on console.error. This will calculate stripe_customers affected + send you email
// alerts, if you've opted into receiving them.
// [START reporterror]
// function reportError(err, context = {}) {
//   // This is the name of the StackDriver log stream that will receive the log
//   // entry. This name can be any valid log stream name, but must contain "err"
//   // in order for the error to be picked up by StackDriver Error Reporting.
//   const logName = "errors"
//   const log = logging.log(logName)

//   // https://cloud.google.com/logging/docs/api/ref_v2beta1/rest/v2beta1/MonitoredResource
//   const metadata = {
//     resource: {
//       type: "cloud_function",
//       labels: { function_name: process.env.FUNCTION_NAME },
//     },
//   }

//   // https://cloud.google.com/error-reporting/reference/rest/v1beta1/ErrorEvent
//   const errorEvent = {
//     message: err.stack,
//     serviceContext: {
//       service: process.env.FUNCTION_NAME,
//       resourceType: "cloud_function",
//     },
//     context: context,
//   }

//   // Write the error log entry
//   return new Promise((resolve, reject) => {
//     log.write(log.entry(metadata, errorEvent), error => {
//       if (error) {
//         return reject(error)
//       }
//       return resolve()
//     })
//   })
// }
// [END reporterror]

// Sanitize the error message for the user
function userFacingMessage(error) {
  return error.type
    ? error.message
    : "An error occurred, developers have been alerted"
}
