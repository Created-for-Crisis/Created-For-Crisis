import React from "react"
import { Link } from "gatsby"

// import { withFirebase } from "./Firebase"
import { AuthUserContext } from "./Session"
import Button from "./button"

const Navigation = ({ routes }) => (
  <AuthUserContext.Consumer>
    {authUser => <NavigationMenu routes={routes} authUser={authUser} />}
  </AuthUserContext.Consumer>
)

// const SignInButton = ({ firebase }) => (
//   <Button
//     variant="tertiary"
//     onClick={firebase ? firebase.doSignInWithGoogle : () => {}}
//   >
//     Log In
//   </Button>
// )

// const SignOutButton = ({ firebase }) => (
//   <Button variant="primary" onClick={firebase ? firebase.doSignOut : () => {}}>
//     Sign Out
//   </Button>
// )

// const SignIn = withFirebase(SignInButton)
// const SignOut = withFirebase(SignOutButton)

const NavigationMenu = ({ routes, authUser }) => (
  <nav>
    {routes &&
      routes.map(({ title, slug }, i) => (
        <Link key={i} to={`/${slug}/`} activeClassName="active">
          {title}
        </Link>
      ))}
    <Button variant="tertiary" className="button" as={Link} to={"/donate/"}>
      Donate
    </Button>
    {/* {authUser ? <SignOut /> : <SignIn />} */}
  </nav>
)

export default Navigation
