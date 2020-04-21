import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import SEO from "../components/Layout/SEO"
import Layout from "../components/Layout/Layout"
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
    }
  }
`
