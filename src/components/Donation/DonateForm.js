import React, { useReducer } from "react"
import { Formik, Form, useField } from "formik"
import styled from "styled-components"
import { Grid, Cell } from "styled-css-grid"
import * as Yup from "yup"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  useStripe,
  CardElement,
  useElements,
} from "@stripe/react-stripe-js"
import { Button } from "../Button"
import { TextField } from "../TextField"
import StripeForm from "./StripeForm"
import AmountSelection from "./AmountSelection"

// Load & Initialize Stripe
const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"
const stripePromise = loadStripe(
  activeEnv === "development"
    ? process.env.GATSBY_STRIPE_PUBLISHABLE_KEY_DEV
    : process.env.GATSBY_STRIPE_PUBLISHABLE_KEY_PROD
)

const Row = styled.div`
  margin-bottom: 1.5rem;
`

const Message = styled.div`
  border-radius: 0.25rem;
  padding: 1rem;
  border: none;
  background-color: ${props => props.theme.colors[props.color]};
  box-shadow: ${props => props.theme.shadows.button};
  color: ${props => props.theme.colors.shades.white};
  h3 {
    color: ${props => props.theme.colors.shades.white};
    margin-bottom: 0.5rem;
  }
  p {
    margin: 0;
  }
`

const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props)
  return <TextField label={label} {...field} {...props} />
}

// Form Data Reducer
function reducer(state, { type, payload }) {
  switch (type) {
    case "processing":
      return { ...state, processing: payload }
    case "changeAmount":
      const { amount, showCustomAmount } = payload
      return {
        ...state,
        amount,
        showCustomAmount,
      }
    case "showCustomAmount":
      return { ...state, showCustomAmount: payload }
    case "handleError":
      return { ...state, error: payload }
    case "handleSuccess":
      return { ...state, success: payload, error: null }
    default:
      throw new Error()
  }
}

const FormContainer = () => {
  const stripe = useStripe()
  const elements = useElements()

  const [
    { error, success, processing, amount, showCustomAmount },
    dispatch,
  ] = useReducer(reducer, {
    processing: false,
    amount: {
      text: "$10.00",
      value: 1000,
      custom: false,
    },
    showCustomAmount: false,
    error: false,
    success: false,
  })

  return (
    <>
      <h2 style={{ marginTop: 0 }}>Donate to Created for Crisis</h2>
      <Formik
        initialValues={{
          name: "",
          email: "",
          memo: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={async ({ name, email, memo }, { setSubmitting }) => {
          if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
          }

          dispatch({ type: "processing", payload: true })

          const clientSecret = await fetch(
            `${
              activeEnv === "development"
                ? process.env.GATSBY_EXPRESS_API_PATH_DEV
                : process.env.GATSBY_EXPRESS_API_PATH_PROD
            }/paymentIntent`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                amount: amount.value,
                description: memo,
                metadata: {
                  organization: "Created for Crisis",
                  memo,
                },
              }),
            }
          )
            .then(function(response) {
              return response.json()
            })
            .then(function(responseJson) {
              return responseJson.client_secret
            })
            .catch(error => {
              console.error(error)
              return null
            })

          if (!clientSecret) {
            return dispatch({
              type: "handleError",
              payload:
                "We encountered an error from our API when generating the payment.",
            })
          }

          const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                  name,
                  email,
                },
              },
              receipt_email: email,
            }
          )

          if (error) {
            // Show error to your customer (e.g., insufficient funds)
            dispatch({ type: "handleError", payload: error.message })
          } else {
            // The payment has been processed!
            if (paymentIntent.status === "succeeded") {
              // Show a success message to your customer
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
              dispatch({ type: "handleSuccess", payload: true })
            }
          }

          dispatch({ type: "processing", payload: false })
          setSubmitting(false)
        }}
      >
        {success ? (
          <Message color="green" style={{ margin: "2rem 0" }}>
            <h3>Thank you!</h3>
            <p>We successfully processed your donation.</p>
          </Message>
        ) : (
          <Form style={{ margin: 0 }}>
            {/* Show Development Mode */}
            {activeEnv === "development" && (
              <Message color="blue" style={{ margin: "2rem 0" }}>
                <h3>Development Mode is Enabled</h3>
                <p>
                  All donation submissions will hit the test Stripe account.
                </p>
              </Message>
            )}
            <Row>
              <Grid columns={2} gap={"1rem"}>
                <Cell>
                  <TextInput
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="Jane Doe"
                  />
                </Cell>
                <Cell>
                  <TextInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="jane@createdforcrisis.org"
                  />
                </Cell>
              </Grid>
            </Row>
            <Row>
              <TextInput
                label="Memo"
                name="memo"
                type="text"
                placeholder="e.g. Credit to my organization"
              />
            </Row>
            {/* Donation Amounts */}
            <Row style={{ marginBottom: ".5rem" }}>
              <TextField.Label>Donation Amount</TextField.Label>
              <AmountSelection
                amount={amount}
                showCustomAmount={showCustomAmount}
                dispatch={dispatch}
              />
            </Row>

            {/* Stripe Data */}
            <Row>
              <TextField.Label>Card Details</TextField.Label>
              <StripeForm />
            </Row>
            {/* Submission Button */}
            <Button
              type="submit"
              color="green"
              disabled={!stripe || processing}
              style={{ marginBottom: "2rem" }}
            >
              {processing ? "Processing..." : "Confirm Donation"}
            </Button>
            {error && (
              <Message color="red" style={{ marginTop: "2rem" }}>
                <h3>An Error Occurred</h3>
                <p>{error}</p>
              </Message>
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}

export const DonateForm = () => (
  <Elements stripe={stripePromise}>
    <FormContainer />
  </Elements>
)
