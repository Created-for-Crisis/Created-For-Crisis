import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ContentContainer } from "../styles/components"

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
      <ContentContainer>
        <h1>Team</h1>
      </ContentContainer>
    </Layout>
  )
}

export default Team
