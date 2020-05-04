import React from "react"
import { linkTo } from "@storybook/addon-links"
import { Container } from "../src/components/Container"

export default {
  title: "Welcome",
}

export const Introduction = () => (
  <Container size="article" padded>
    <h1>Created for Crisis Storybook</h1>
    <p>
      This is the storybook collection for the Created for Crisis Design System.
      The designs are viewable in Figma <a>here</a>.
    </p>
    <h2>Components</h2>
    <ul>
      <li onClick={linkTo("Button")}>Button</li>
      <li onClick={linkTo("Container")}>Container</li>
    </ul>
    <h2>Layout Pieces</h2>
    <ul>
      <li onClick={linkTo("Button")}>Button</li>
      <li onClick={linkTo("Container")}>Container</li>
    </ul>
  </Container>
)
