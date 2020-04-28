import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import SEO from "../components/Layout/SEO"
import Layout from "../components/Layout/Layout"
import { Splash } from "../components/Splash"
import { Container } from "../components/Container"

const Page = ({
  data: {
    contentfulPage: { title, subtitle, splashActions },
  },
}) => (
  <Layout>
    <SEO title={title} />
    {/* Page Components */}
    <Splash actions={splashActions}>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </Splash>
    <Container size="content">Stuff</Container>
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
      subtitle
      splashActions {
        text
        color
        icon
        iconPosition
        id
        url
        external
      }
      content {
        json
      }
    }
  }
`
