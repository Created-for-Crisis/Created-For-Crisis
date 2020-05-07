import React from "react"
import styled from "styled-components"
import Cleave from "cleave.js/react"
import { Button } from "../Button"
import { TextField } from "../TextField"

const Donations = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

const CustomAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 1px 3px #e6ebf1;
  transition: box-shadow 150ms ease;
  border-radius: 4px;
  overflow: hidden;
  flex: 1;
  margin: 0.5 1rem 0 0;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0.75rem 1rem;
    color: ${props => props.theme.colors.shades.textMedium};
    background-color: ${props => props.theme.colors.shades.plainGrey};
    font-family: ${props => props.theme.fonts.body};
    font-weight: 500;
  }
  input {
    height: 40px;
    padding: 0.6rem 0.75rem;
    border: 1px solid transparent;
    width: 100%;
    color: #32325d;
    font-size: 17px;
    background-color: white;

    &--focus {
      box-shadow: 0 1px 3px 0 #cfd7df;
    }
    &--invalid {
      border-color: ${props => props.theme.colors.primary};
    }
    &--webkit-autofill {
      background-color: #fefde5 !important;
    }
  }
`

const donationAmounts = [
  {
    text: "$10.00",
    value: 1000,
  },
  {
    text: "$25.00",
    value: 2500,
  },
  {
    text: "$50.00",
    value: 5000,
  },
  {
    text: "$100.00",
    value: 10000,
  },
]

const AmountSelection = ({ amount, showCustomAmount, dispatch }) => (
  <Donations>
    {donationAmounts.map(({ text, value }, i) => (
      <Button
        key={i}
        className={`${
          amount.value === value && !showCustomAmount ? "active" : "inactive"
        }`}
        shadow={false}
        minWidth={false}
        color={amount.value === value && !showCustomAmount ? "medium" : "plain"}
        style={{ margin: ".5rem 1rem 0 0" }}
        onClick={e =>
          dispatch({
            type: "changeAmount",
            payload: {
              amount: {
                text,
                value,
                custom: false,
              },
              showCustomAmount: false,
            },
          })
        }
        type="button"
      >
        {text}
      </Button>
    ))}

    {!showCustomAmount ? (
      <Button
        type="button"
        shadow={false}
        minWidth={false}
        color={"medium"}
        style={{ margin: ".5rem 1rem 0 0" }}
        onClick={e =>
          dispatch({
            type: "showCustomAmount",
            payload: true,
          })
        }
      >
        Custom Amount
      </Button>
    ) : (
      // <TextField />
      <CustomAmount>
        <span>$</span>
        <Cleave
          placeholder="Enter other amount"
          options={{
            numeral: true,
            numeralPositiveOnly: true,
            numeralThousandsGroupStyle: "thousand",
          }}
          onChange={({ target: { rawValue } }) => {
            let value
            // If decimal specified
            if (rawValue.includes(".")) {
              let valueArr = rawValue.split(".")
              // If cents specified
              if (valueArr[1].length === 2) {
                value = parseInt(valueArr.join(""))
              }
              // If first cent is specified
              else if (valueArr[1].length === 1) {
                value = parseInt(valueArr.join("") + "0")
              }
              // No cents specified
              else {
                value = parseInt(valueArr.join("") + "00")
              }
            }
            // Return + cents
            else if (rawValue) {
              value = parseInt(rawValue + "00")
            }

            dispatch({
              type: "changeAmount",
              payload: {
                amount: {
                  text: "Custom",
                  value,
                  custom: true,
                },
                showCustomAmount: true,
              },
            })
          }}
        />
      </CustomAmount>
    )}
  </Donations>
)

export default AmountSelection
