import React from "react"
import { withKnobs, select, text } from "@storybook/addon-knobs"
import HomeHeader from "../src/components/Header/HomeHeader"
import Header from "../src/components/Header/Header"

export default {
  title: "HomeHeader",
  component: HomeHeader,
  decorators: [withKnobs],
}

const routes = [
  { title: "About", slug: "about" },
  { title: "News", slug: "new" },
  { title: "Projects", slug: "projects" },
  { title: "Support", slug: "support" },
]

export const Home = () => (
  <HomeHeader
    routes={routes}
    color={select("Color", ["light", "dark"], "dark")}
  />
)

export const Default = () => (
  <Header color={select("Color", ["light", "dark"], "dark")} routes={routes}>
    <h1>{text("Header Text", "Masks")}</h1>
  </Header>
)
