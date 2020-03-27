import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Banner from "../components/blocks/banner"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { ContentContainer, Grid } from "../styles/components"
import TeamMember from "../components/teamMember"

const Team = () => {
  const {
    allContentfulTeamMember: { edges: teamMembers },
    contentfulBanner,
  } = useStaticQuery(graphql`
    query getTeamData {
      contentfulBanner(id: { eq: "d62d5f94-075e-5609-aa0b-c3ddcd86b5f9" }) {
        title
        illustration {
          file {
            url
          }
        }
        actions {
          text
          variant
          link
          icon
        }
        content {
          json
        }
      }
      allContentfulTeamMember {
        edges {
          node {
            id
            name
            position
            role
            bio {
              json
            }
            linkedInUrl
            gitHubUrl
            website
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

  /*
   ** Breakdown team members by role
   */

  let founder = teamMembers.filter(
    ({ node: { position } }) => position === "Founder"
  )[0]

  let orgLeaders = teamMembers.filter(
    ({ node: { position } }) => position === "Organization Leader"
  )

  let members = teamMembers.filter(
    ({ node: { position } }) => position === "Team Member"
  )

  let contributors = teamMembers.filter(
    ({ node: { position } }) => position === "Contributor"
  )

  return (
    <Layout>
      <SEO title="Team" />
      <Banner {...contentfulBanner} />
      <ContentContainer>
        {founder && (
          <section>
            <h2
              style={{
                margin: "4rem 0 2rem",
                textAlign: "center",
                lineHeight: "1.5",
              }}
            >
              Founder
            </h2>
            <TeamMember {...founder.node} fullSize />
          </section>
        )}
        {orgLeaders.length > 0 && (
          <section>
            <h2
              style={{
                margin: "4rem 0 2rem",
                textAlign: "center",
                lineHeight: "1.5",
              }}
            >
              Organization Leaders
            </h2>
            {orgLeaders.map(({ node }) => (
              <TeamMember key={node.id} {...node} fullSize />
            ))}
          </section>
        )}
        {members.length > 0 && (
          <section>
            <h2
              style={{
                margin: "4rem 0 1rem",
                textAlign: "center",
                lineHeight: "1.5",
              }}
            >
              Team Members
            </h2>
            <p
              style={{
                textAlign: "center",
                fontStyle: "italic",
                marginBottom: "2rem",
              }}
            >
              Special thanks to the little bird tweeting advice, the turtle who
              kept us steady, and the pony who carries us through to the end.
            </p>
            <Grid lg={2}>
              {members.map(({ node }) => (
                <TeamMember key={node.id} {...node} />
              ))}
            </Grid>
          </section>
        )}
        {contributors.length > 0 && (
          <section>
            <h2
              style={{
                margin: "4rem 0 1rem",
                textAlign: "center",
                lineHeight: "1.5",
              }}
            >
              Contributors
            </h2>
            <Grid lg={3}>
              {contributors.map(({ node }) => (
                <TeamMember key={node.id} {...node} />
              ))}
            </Grid>
          </section>
        )}
      </ContentContainer>
    </Layout>
  )
}

export default Team
