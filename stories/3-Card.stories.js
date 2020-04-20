import React from "react"
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs"
import { withA11y } from "@storybook/addon-a11y"
import { Container } from "../src/components/Container"
import { CardGrid, Card } from "../src/components/Card"

export default {
  title: "Card",
  component: Card,
  decorators: [withKnobs, withA11y],
}

export const Dynamic = () => (
  <Container padded size="content">
    <CardGrid columns={2}>
      <Card
        title={text(
          "Title",
          "How To Make A Coronavirus Face Mask Out Of A T-Shirt"
        )}
        image={text("Image URL", "https://source.unsplash.com/60x60/daily")}
        source={text("Source", "abc11.com")}
        date={text("Date", "April 9th, 2020")}
        shadow={boolean("Shadow", true)}
      />
    </CardGrid>
  </Container>
)

export const Grids = () => (
  <Container padded size="content">
    <h4>2 Column Grid</h4>
    <CardGrid columns={2}>
      <Card />
      <Card />
      <Card />
      <Card />
    </CardGrid>
  </Container>
)
