import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { AuthUserContext } from "../Session"
import { Button } from "../Button"
import styled from "styled-components"
import { PropStyles } from "../../styles/helpers"
import CreatedForCrisisLogo from "../../assets/logos/CreatedForCrisisLogo"
import NavigationLink from "./NavigationLink"

const Navigation = ({ routes, color }) => (
  <AuthUserContext.Consumer>
    {authUser => (
      <NavigationMenu color={color} routes={routes} authUser={authUser} />
    )}
  </AuthUserContext.Consumer>
)

const NavVariants = PropStyles("color", ({ colors }) => ({
  dark: {
    backgroundColor: colors.blue,
  },
  light: {
    backgroundColor: colors.shades.white,
  },
}))

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;

  ${NavVariants};
`

const NavigationMenu = ({ routes, color, authUser }) => (
  <Nav color={color}>
    <CreatedForCrisisLogo color={color} />
    <div>
      {routes &&
        routes.map(({ title, slug }, i) => (
          <NavigationLink
            color={color}
            key={i}
            to={`/${slug}/`}
            activeClassName="active"
          >
            {title}
          </NavigationLink>
        ))}
      {authUser && (
        <Button color="gold" className="button" as={Link} to={"/myAccount/"}>
          My Account
        </Button>
      )}
      {!authUser && (
        <Button color="green" className="button" as={Link} to={"/donate/"}>
          Donate
        </Button>
      )}
    </div>
  </Nav>
)

NavigationMenu.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
}

NavigationMenu.defaultProps = {
  color: "light",
}

export default Navigation
