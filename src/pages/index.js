import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import SEO from "../components/Layout/SEO"

const Home = () => {
  const {
    contentfulPage: { title },
  } = useStaticQuery(graphql`
    query getHomePage {
      contentfulPage(id: { eq: "5aad30ce-e2de-59c6-9d4c-b3125b1ff5d5" }) {
        title
        content {
          json
        }
      }
    }
  `)
  return (
    <Layout>
      <SEO title={title} />
      <p>Neat</p>
    </Layout>
  )
}

export default Home
