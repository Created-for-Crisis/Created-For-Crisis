import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Splash from "../components/splash"
import TeamIllustration from "../assets/team_illustration.png"
import DiscordLogo from "../assets/logos/Discord-Logo-White.svg"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ContentContainer, ActionGroup } from "../styles/components"
import Button from "../components/button"

const Team = () => {
  const {
    allContentfulTeamMember: { edges: teamMembers },
  } = useStaticQuery(graphql`
    query getTeamMembers {
      allContentfulTeamMember {
        edges {
          node {
            name
            image {
              fluid(
                quality: 100
                maxHeight: 120
                maxWidth: 120
                cropFocus: FACE
                resizingBehavior: FILL
              ) {
                src
              }
            }
          }
        }
      }
    }
  `)

  console.log({ teamMembers })
  return (
    <Layout>
      <SEO title="Team" />
      <Splash image={TeamIllustration}>
        <span>Average Joes</span>
        <h1>Our Team</h1>
        <p>
          As an online community we coordinate efforts and work together, or
          something like that.
        </p>
        <ActionGroup>
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
      <ContentContainer>
        <h1>Team</h1>
      </ContentContainer>
    </Layout>
  )
}

export default Team
