import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"
import PageBuilder from "../components/blocks/pageBuilder"

const Home = () => {
  const {
    contentfulPage: { title, content, blocks },
  } = useStaticQuery(graphql`
    query getHomePage {
      contentfulPage(id: { eq: "b8d22ea9-975f-5a51-8d54-ac1899205374" }) {
        title
        content {
          json
        }
        blocks {
          ... on ContentfulBanner {
            id
            actions {
              icon
              id
              link
              text
              variant
            }
            illustration {
              file {
                url
              }
            }
            content {
              json
            }
          }
          ... on ContentfulImageBlock {
            id
            title
            content {
              json
            }
            alignment
            image {
              file {
                url
              }
            }
          }
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title={title} />
      {PageBuilder(blocks, content)}
    </Layout>
  )
}

export default Home
