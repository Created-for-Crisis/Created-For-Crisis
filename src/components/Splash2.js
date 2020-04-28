import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import WorldVectorDark from "../assets/images/world-vector-dark.png"
import { Container } from "./Container"

const SplashBackground = styled.header`
  background-color: ${props => props.theme.colors.blue};
`

const SplashInner = styled.div`
  background-repeat: no-repeat;
  padding-bottom: 62px;

  background-position-x: ${props => props.backgroundPosition.x};
  background-position-y: ${props => props.backgroundPosition.y};
  background-image: url(${WorldVectorDark});

  h1,
  p {
    color: ${props => props.theme.colors.shades.white};
  }

  h1 {
    margin-bottom: 0;
    font-size: 6.875rem;
  }

  p {
    max-width: 731px;
    font-size: 1.5rem;
    font-family: "Open Sans", "sans-serif";
    font-weight: normal;
    line-height: 2.25rem;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  button,
  a {
    margin-right: 32px;
  }
`

export const Splash = ({ backgroundPosition, children }) => {
  return (
    <SplashBackground>
      <Container size="content">
        <SplashInner backgroundPosition={backgroundPosition}>
          {children}
        </SplashInner>
      </Container>
    </SplashBackground>
  )
}

Splash.propTypes = {
  children: PropTypes.node.isRequired,
  backgroundPosition: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
  }),
}

Splash.defaultProps = {
  backgroundPosition: { x: "right", y: "50px" },
}
