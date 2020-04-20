import React from "react"
import { action } from "@storybook/addon-actions"
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs"
import { withA11y } from "@storybook/addon-a11y"
import { Shield, ArrowRight, ExternalLink } from "react-feather"
import { ButtonGroup, Button } from "../src/components/Button"

export default {
  title: "Button",
  component: Button,
  decorators: [withKnobs, withA11y],
}

export const Dynamic = () => (
  <Button
    onClick={action("clicked")}
    color={select("Color", ["blue"], "blue")}
    disabled={boolean("Disabled", false)}
    loading={boolean("Loading", false)}
  >
    {text("Content", "Button Text")}
  </Button>
)

export const Gallery = () => (
  <>
    <h4>Color Variants</h4>
    <ButtonGroup>
      <Button color="blue">Ocean Blue</Button>
      <Button color="green">Vibrant Green</Button>
      <Button color="gold">Gold Yellow</Button>
    </ButtonGroup>
    <h4 style={{ marginTop: "2rem" }}>With Icon Positions</h4>
    <ButtonGroup>
      <Button iconPosition="left">
        <Shield /> Icon on Left
      </Button>
      <Button iconPosition="right">
        Icon on Right <Shield />
      </Button>
    </ButtonGroup>
    <h4 style={{ marginTop: "2rem" }}>Extras</h4>
    <ButtonGroup>
      <Button loading>Loading</Button>
      <Button as="a" iconPosition="right" href="https://google.com">
        Link to Google <ExternalLink />
      </Button>
    </ButtonGroup>
  </>
)
