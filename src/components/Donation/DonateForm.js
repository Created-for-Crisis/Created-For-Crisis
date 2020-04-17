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
import Button from "../button"
import StripeForm from "./StripeForm"
import AmountSelection from "./AmountSelection"

const stripePromise = loadStripe(
  process.env.NODE_ENV === "development"
    ? process.env.GATSBY_STRIPE_PUBLISHABLE_KEY_DEV
    : process.env.GATSBY_STRIPE_PUBLISHABLE_KEY_PROD
)

const DonateContainer = styled.div`
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  padding: 1rem;
  background: ${props => props.theme.colors.whiteGrey};
  border: 1px solid ${props => props.theme.colors.whiteGrey};
`

const Label = styled.header`
  display: block;
  font-family: ${props => props.theme.fonts.body};
  font-weight: 500;
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
`

const Row = styled.div`
  margin-bottom: 1.5rem;
`

const Message = styled.div`
  border-radius: 0.25rem;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.whiteGrey};
  background-color: ${props =>
    props.error ? props.theme.colors.primary : props.theme.colors.secondary};
  color: ${props => props.theme.colors.white};
  header {
    font-family: ${props => props.theme.fonts.header};
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  p {
    margin: 0;
  }
`

const Input = styled.input`
  height: 40px;
  padding: 0.6rem 0.75rem;
  width: 100%;
  color: #32325d;
  background-color: white;
  border: 1px solid transparent;
  border-radius: 4px;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;

  &--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }
  &--invalid,
  &.error {
    border-color: ${props => props.theme.colors.primary};
  }
  &--webkit-autofill {
    background-color: #fefde5 !important;
  }
`

const TextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input> and also replace ErrorMessage entirely.
  const [field, meta] = useField(props)
  return (
    <>
      <Label style={{ marginTop: 0 }} htmlFor={props.id || props.name}>
        {label}
      </Label>
      <Input
        className={`text-input ${meta.touched && meta.error ? "error" : ""}`}
        {...field}
        {...props}
      />
      {/* {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null} */}
    </>
  )
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
      text: "$3.00",
      value: 300,
      custom: false,
    },
    showCustomAmount: false,
    error: false,
    success: false,
  })

  return (
    <DonateContainer>
      <h3 style={{ marginTop: 0 }}>Donate to Created for Crisis</h3>
      <Formik
        initialValues={{
          name: "",
          email: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
          }

          dispatch({ type: "processing", payload: true })

          const clientSecret = await fetch(
            `${
              process.env.NODE_ENV === "development"
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
                metadata: {
                  organization: "Created for Crisis",
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
                  ...values,
                  // address: {
                  //   city: null,
                  //   country: null,
                  //   line1: null,
                  //   line2: null,
                  //   postal_code: "94103",
                  //   state: null,
                  // },
                },
              },
              receipt_email: values.email,
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
          <Message>
            <header>Thank you!</header>
            <p>We successfully processed your donation.</p>
          </Message>
        ) : (
          <Form style={{ margin: 0 }}>
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
            {/* Donation Amounts */}
            <Row>
              <Label>Donation Amount</Label>
              <AmountSelection
                amount={amount}
                showCustomAmount={showCustomAmount}
                dispatch={dispatch}
              />
            </Row>

            {/* Stripe Data */}
            <Row>
              <Label>Card Details</Label>
              <StripeForm />
            </Row>
            {/* Submission Button */}
            <Button
              type="submit"
              variant="secondary"
              disabled={!stripe || processing}
              style={{ fontSize: "1.1rem", height: "40px" }}
            >
              {processing ? "Processing..." : "Confirm Donation"}
            </Button>
            {error && (
              <Message error style={{ marginTop: "2rem" }}>
                <header>An Error Occurred</header>
                <p>{error}</p>
              </Message>
            )}
          </Form>
        )}
      </Formik>
      {/* Show Development Mode */}
      {process.env.NODE_ENV === "development" && (
        <Message error style={{ marginTop: "2rem" }}>
          <header>Development Mode is Enabled</header>
          <p>All donation submissions will hit the test Stripe account.</p>
        </Message>
      )}
    </DonateContainer>
  )
}

const DonateForm = () => (
  <Elements stripe={stripePromise}>
    <FormContainer />
  </Elements>
)

export default DonateForm
