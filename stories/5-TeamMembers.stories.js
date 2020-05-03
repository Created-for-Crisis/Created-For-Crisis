import React from "react"
import { withKnobs, text } from "@storybook/addon-knobs"
import { TeamMember, TeamMembers } from "../src/components/TeamMembers"

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

const members = [
  {
    name: "Jane Doe",
    title: "Program Director",
    gitHubUrl: null,
    linkedInUrl: "http://google.com",
    website: "http://google.com",
  },
  {
    name: "Yasmine Donaldson",
    title: "Design and Development",
    gitHubUrl: "http://google.com",
    linkedInUrl: "http://google.com",
  },
  {
    name: "John Doe",
    title: "Head of Marketing",
    gitHubUrl: null,
    linkedInUrl: "http://google.com",
  },
  {
    name: "Arlo Dean",
    title: "Sewing and Prototyping",
    gitHubUrl: "http://google.com",
    linkedInUrl: "http://google.com",
    website: "http://google.com",
  },
]

export const List = () => <TeamMembers members={members} />
