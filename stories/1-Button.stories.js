import React from "react"
import { action } from "@storybook/addon-actions"
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs"
import { withA11y } from "@storybook/addon-a11y"
import { Shield, ExternalLink } from "react-feather"
import { ButtonGroup, Button } from "../src/components/Button"
import { Container } from "../src/components/Container"

export default {
  title: "Button",
  component: Button,
  decorators: [withKnobs, withA11y],
}

export const Dynamic = () => (
  <Container padded>
    <Button
      onClick={action("clicked")}
      color={select(
        "Color",
        [
          "blue",
          "green",
          "gold",
          "purple",
          "red",
          "plain",
          "mute",
          "discord",
          "discord-inverse",
        ],
        "blue"
      )}
      shadow={boolean("Shadow", true)}
      disabled={boolean("Disabled", false)}
      loading={boolean("Loading", false)}
    >
      {text("Content", "Button Text")}
    </Button>
  </Container>
)

export const Gallery = () => (
  <Container padded>
    <h4>Color Variants</h4>
    <ButtonGroup>
      <Button color="blue">Blue</Button>
      <Button color="green">Green</Button>
      <Button color="gold">Yellow</Button>
      <Button color="purple">Purple</Button>
      <Button color="red">Red</Button>
      <Button color="plain">Plain</Button>
      <Button color="mute" shadow={false}>
        Mute
      </Button>
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
      <Button color="discord">Discord</Button>
      <Button color="discord-inverse">Discord Inverse</Button>
      <Button loading>Loading</Button>
      <Button as="a" iconPosition="right" href="https://google.com">
        Link to Google <ExternalLink />
      </Button>
    </ButtonGroup>
  </Container>
)
