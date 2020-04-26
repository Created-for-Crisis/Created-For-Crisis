import React from "react"
import { withKnobs, select } from "@storybook/addon-knobs"
import Navigation from "../src/components/Navigation/Navigation"

const routes = [
  { title: "About", slug: "about" },
  { title: "News", slug: "new" },
  { title: "Projects", slug: "projects" },
  { title: "Support", slug: "support" },
]

export default {
  component: Navigation,
  title: "Navigation",
  decorators: [withKnobs],
}

export const Default = () => (
  <Navigation
    routes={routes}
    color={select("Color", ["light", "dark"], "dark")}
  />
)
