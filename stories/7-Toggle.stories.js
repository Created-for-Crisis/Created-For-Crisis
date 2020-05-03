import React, { useState } from "react"
import Toggle from "../src/components/Toggle"

export default {
  component: Toggle,
  title: "Toggle",
}

const ExampleComponent = () => {
  const [selectedValue, setSelectedValue] = useState(null)

  const options = [
    { value: 3, text: "$3.00" },
    { value: 5, text: "$5.00" },
    { value: 10, text: "$10.00" },
    { value: 15, text: "$15.00" },
  ]

  return (
    <>
      <Toggle
        value={selectedValue}
        options={options}
        onChange={value => setSelectedValue(value)}
      />
      <div style={{ margin: 16 }}>
        <pre>{JSON.stringify({ selectedValue })}</pre>
      </div>
    </>
  )
}

export const Example = () => <ExampleComponent />
