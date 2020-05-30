import React from "react"
import Layout from "../components/Layout/Layout"
import SEO from "../components/Layout/SEO"
import { Splash } from "../components/Splash"
import config from "../../config"
import FourOhFour from "../assets/icons/404.js"

const NotFound = () => {
  return (
    <Layout>
      <SEO title={`404 | ${config.title}`} desc={config.description} />
      {/* Page Components */}
      <Splash
        title={
          <FourOhFour height="6.25rem" style={{ display: "inline-block" }} />
        }
        // subtitle={"This page doesn't exist."}
        actions={null}
      />
    </Layout>
  )
}

export default NotFound
