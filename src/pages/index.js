import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import SEO from "../components/Layout/SEO"
import { Splash } from "../components/Splash"

const Home = () => {
  const {
    contentfulPage: { title, subtitle, splashActions },
  } = useStaticQuery(graphql`
    query getHomePage {
      contentfulPage(slug: { eq: "home" }) {
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
  `)
  return (
    <Layout>
      <SEO title={title} />
      {/* Page Components */}
      <Splash title={title} subtitle={subtitle} actions={splashActions} />
    </Layout>
  )
}

export default Home
