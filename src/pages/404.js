import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import SEO from "../components/seo"
import Banner from "../components/blocks/banner"

const NotFoundPage = () => {
  const { contentfulBanner } = useStaticQuery(graphql`
    query get404Page {
      contentfulBanner(id: { eq: "6fcf583e-9dc5-51d0-85f5-e128b924ff33" }) {
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
          internal_link
        }
        content {
          json
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="404: Not found" />
      <Banner {...contentfulBanner} />
    </Layout>
  )
}

export default NotFoundPage
