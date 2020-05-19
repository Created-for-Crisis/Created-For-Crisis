/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { Component } from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"
import { theme, GlobalStyle } from "../../styles/theme"

import getFirebase, { FirebaseContext } from "../Firebase"
import { AuthUserContext } from "../Session"
import withAuthentication from "../Session/withAuthentication"
import { Masthead } from "./Masthead"
import { Footer } from "./Footer"

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
  return (
    <>
      <AuthUserContext.Consumer>
        {authUser => <Masthead user={authUser} />}
      </AuthUserContext.Consumer>
      <main>{children}</main>
      <Footer />
    </>
  )
})

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
