import React from "react"
import { Mail } from "react-feather"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Splash from "../components/splash"
import Goals from "../components/goals"
import Button from "../components/button"
import { ActionGroup } from "../styles/components"
import ConnectedWorld from "../assets/connected_world.png"
import DiscordLogo from "../assets/logos/Discord-Logo-White.svg"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Splash image={ConnectedWorld}>
      <span>We are</span>
      <h1>Created For Crisis</h1>
      <p>
        We’re here to solve problems faced by healthcare providers during the
        COVID-19 pandemic and beyond.
      </p>
      <h3>Let us do what we do best so you can, too.</h3>
      <ActionGroup>
        <Button
          variant="primary"
          as="a"
          href="mailto:info@createdforcrisis.org"
          target="_blank"
          className="action"
        >
          Contact Us <Mail />
        </Button>
        <Button
          variant="discord"
          as="a"
          href="https://discord.gg/T2Xw2j7"
          target="_blank"
          className="action"
        >
          Get Involved <DiscordLogo />
        </Button>
      </ActionGroup>
    </Splash>
    <Goals />
  </Layout>
)

export default IndexPage
