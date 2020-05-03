import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import SEO from "../components/Layout/SEO"
import { Splash } from "../components/Splash"

/*
 ** This page is also compiled manually
 ** so we can add the Donation Form within the content.
 */

const Support = () => {
  const {
    contentfulPage: { title, subtitle, splashActions },
  } = useStaticQuery(graphql`
    query getSupportPage {
      contentfulPage(slug: { eq: "support" }) {
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

export default Support
