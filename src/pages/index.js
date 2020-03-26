import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Splash from "../components/splash"
import Goals from "../components/goals"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Splash />
    <Goals />
  </Layout>
)

export default IndexPage
