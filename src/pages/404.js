import React from "react"
import Layout from "../components/Layout/Layout"
import SEO from "../components/Layout/SEO"
import { Splash } from "../components/Splash"

const NotFound = () => {
  return (
    <Layout>
      <SEO title={"404 | Created for Crisis"} />
      {/* Page Components */}
      <Splash title={"404"} subtitle={null} actions={null} />
    </Layout>
  )
}

export default NotFound
