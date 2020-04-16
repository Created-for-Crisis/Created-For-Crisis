import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import SEO from "../components/seo"
import Layout from "../components/Layout/Layout"
import { ContentContainer } from "../styles/components"

const Article = ({ data: { contentfulArticle: article } }) => (
  <Layout>
    <SEO title={article.title} />
    <ContentContainer>
      <h1>{article.title}</h1>
    </ContentContainer>
  </Layout>
)

Article.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default Article

export const postQuery = graphql`
  query($id: String!) {
    contentfulArticle(id: { eq: $id }) {
      title
    }
  }
`
