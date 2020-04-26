import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Navigation from "../Navigation/Navigation"
import { PropStyles } from "../../styles/helpers"
import { Container } from "../Container"
import Hero from "./Hero"

const HeaderVariants = PropStyles("color", ({ colors }) => ({
  dark: {
    backgroundColor: colors.blue,
    "& h1, h6": {
      color: colors.shades.white,
    },
  },
  light: {
    backgroundColor: colors.shades.white,
  },
}))

const StyledHeader = styled.header`
  ${HeaderVariants};
`

const Header = ({ color, routes, backgroundPosition, children }) => {
  return (
    <StyledHeader color={color}>
      <Container size="content">
        <Navigation color={color} routes={routes} />
        <Hero color={color} {...(backgroundPosition && { backgroundPosition })}>
          {children}
        </Hero>
      </Container>
    </StyledHeader>
  )
}

Header.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  backgroundPosition: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
  }),
}

Header.defaultProps = {
  color: "light",
  backgroundPosition: null,
}

export default Header
