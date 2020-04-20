import React from "react"
import { linkTo } from "@storybook/addon-links"
import { Container } from "../src/components/Container"

export default {
  title: "Welcome",
}

export const Introduction = () => (
  <Container size="article" padded top={0} bottom={0}>
    <h1>Created for Crisis Storybook</h1>
    <p>This is the storybook collection of Created for Crisis components.</p>
    <h2>Components</h2>
    <h3>What we do</h3>
    <ul>
      <li onClick={linkTo("Button")}>Button</li>
      <li onClick={linkTo("Container")}>Container</li>
    </ul>
  </Container>
)
