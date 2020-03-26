import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Splash from "../components/splash"
import TeamIllustration from "../assets/team_illustration.png"
import DiscordLogo from "../assets/logos/Discord-Logo-White.svg"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ContentContainer, ActionGroup, Grid } from "../styles/components"
import Button from "../components/button"
import TeamMember from "../components/teamMember"

const Team = () => {
  const {
    allContentfulTeamMember: { edges: teamMembers },
  } = useStaticQuery(graphql`
    query getTeamMembers {
      allContentfulTeamMember {
        edges {
          node {
            id
            name
            leadership
            role
            biography {
              internal {
                content
              }
            }
            linkedInUrl
            gitHubUrl
            image {
              description
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
        <h2 style={{ margin: "0 0 4rem", textAlign: "center" }}>Leadership</h2>
        <Grid sm={1} md={1} lg={2}>
          {teamMembers
            .filter(({ node: { leadership } }) => leadership)
            .map(({ node }) => (
              <TeamMember key={node.id} {...node} />
            ))}
        </Grid>

        <h2 style={{ margin: "4rem 0", textAlign: "center" }}>Contributors</h2>
        <Grid>
          {teamMembers
            .filter(({ node: { leadership } }) => !leadership)
            .map(({ node }) => (
              <TeamMember key={node.id} {...node} />
            ))}
        </Grid>
      </ContentContainer>
    </Layout>
  )
}

export default Team
