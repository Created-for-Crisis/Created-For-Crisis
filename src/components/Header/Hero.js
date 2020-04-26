import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import WorldVectorLight from "../../assets/images/world-vector-light.svg"
import WorldVectorDark from "../../assets/images/world-vector-dark.svg"
import { PropStyles } from "../../styles/helpers"

const HeroVariants = PropStyles("color", ({ colors }) => ({
  dark: {
    backgroundImage: `url(${WorldVectorDark})`,
  },
  light: {
    backgroundImage: `url(${WorldVectorLight})`,
  },
}))

const StyledHero = styled.div`
  background-repeat: no-repeat;
  padding-bottom: 62px;

  background-position-x: ${props => props.backgroundPosition.x};
  background-position-y: ${props => props.backgroundPosition.y};

  ${HeroVariants};

  h1 {
    margin-bottom: 0;
  }
`

const HeroText = styled.h6`
  max-width: 731px;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  button,
  a {
    margin-right: 32px;
  }
`

const Hero = ({ color, children, backgroundPosition }) => {
  return (
    <StyledHero color={color} backgroundPosition={backgroundPosition}>
      {children}
    </StyledHero>
  )
}

Hero.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
  children: PropTypes.node.isRequired,
  backgroundPosition: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
  }),
}

Hero.defaultProps = {
  color: "light",
  backgroundPosition: { x: "right", y: "50px" },
}

export default Hero
