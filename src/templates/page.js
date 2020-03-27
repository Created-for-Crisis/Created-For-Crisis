import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import SEO from "../components/seo"
import Layout from "../components/layout"
import PageBuilder from "../components/blocks/pageBuilder"

const Page = ({
  data: {
    contentfulPage: { title, content, blocks },
  },
}) => (
  <Layout>
    <SEO title={title} />
    {PageBuilder(blocks, content)}
  </Layout>
)

Page.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default Page

export const postQuery = graphql`
  query($id: String!) {
    contentfulPage(id: { eq: $id }) {
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
`
