/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeProvider } from "styled-components"
import { theme, GlobalStyle } from "../../styles/theme"

import getFirebase, { FirebaseContext } from "../Firebase"
import withAuthentication from "../Session/withAuthentication"
import Header from "../header"
import Footer from "../footer"

class Layout extends Component {
  state = {
    firebase: null,
  }

  componentDidMount() {
    const app = import("firebase/app")
    const auth = import("firebase/auth")
    const firestore = import("firebase/firestore")

    Promise.all([app, auth, firestore]).then(values => {
      const firebase = getFirebase(values[0])

      this.setState({ firebase })
    })
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <FirebaseContext.Provider value={this.state.firebase}>
          <AppWithAuthentication {...this.props} />
        </FirebaseContext.Provider>
      </ThemeProvider>
    )
  }
}

const AppWithAuthentication = withAuthentication(({ children }) => {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <>
      <Header siteTitle={site.siteMetadata.title} />
      <main style={{ paddingTop: "80px" }}>{children}</main>
      <Footer />
    </>
  )
})

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
