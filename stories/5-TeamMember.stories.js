import React from "react"
import { withKnobs, text } from "@storybook/addon-knobs"
import { TeamMember } from "../src/components/TeamMember"

export default {
  component: TeamMember,
  title: "TeamMember",
  decorators: [withKnobs],
}

export const Dynamic = () => (
  <TeamMember
    name={text("Name", "Ryan McKenna")}
    title={text("Title", "Head of Web Design and Engineering")}
    gitHubUrl={text("Github", "http://github.com")}
    linkedInUrl={text("LinkedIn", "http://linkedin.com")}
    website={text("Website", "http://gatsby.js")}
  />
)
