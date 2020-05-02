import React, { useState } from "react"
import { withKnobs, text, boolean } from "@storybook/addon-knobs"
import TextField from "../src/components/TextField"
import styled from "styled-components"

export default {
  component: TextField,
  title: "TextField",
  decorators: [withKnobs],
}

export const Dynamic = () => (
  <TextField
    id="text-field-dynamic"
    label={text("Label", "Label")}
    placeholder={text("Placeholder", "Placeholder")}
    inputProps={{
      disabled: boolean("Disabled", false),
    }}
    helperText={text("Helper text", "Required")}
  />
)

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: flex-start;
  grid-column-gap: 32px;
  margin-bottom: 32px;
`

export const ContactExample = () => {
  const [formData, setFormData] = useState({ fullName: "", email: "" })

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <FormGrid>
        <TextField
          id="full-name"
          label="Full Name"
          placeholder="Jane Doe"
          value={formData.fullName}
          name="fullName"
          onChange={handleChange}
        />

        <TextField
          id="email-address"
          label="Email Address"
          placeholder="example@createdforcrisis.org"
          value={formData.email}
          name="email"
          helperText="For occassional updates"
          onChange={handleChange}
        />
      </FormGrid>
      <pre>{JSON.stringify(formData)}</pre>
    </>
  )
}
