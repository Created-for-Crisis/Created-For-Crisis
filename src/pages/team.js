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
      <Banner {...contentfulBanner} />
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
