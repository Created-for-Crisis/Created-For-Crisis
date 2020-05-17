import React from "react"
import Layout from "../components/Layout/Layout"
import SEO from "../components/Layout/SEO"
import { Splash } from "../components/Splash"
import config from "../../config"

const NotFound = () => {
  return (
    <Layout>
      <SEO title={`404 | ${config.title}`} desc={config.description} />
      {/* Page Components */}
      <Splash title={"404"} subtitle={null} actions={null} />
    </Layout>
  )
}

export default NotFound
