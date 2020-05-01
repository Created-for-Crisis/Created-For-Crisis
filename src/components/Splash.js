import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import styled from "styled-components"
import WorldVectorDark from "../assets/images/world-vector-dark.png"
import Discord from "../assets/icons/discord"
import { Container } from "./Container"
import { Button, ButtonGroup } from "./Button"
import { Download, ExternalLink } from "react-feather"

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

export const Splash = ({ backgroundPosition, actions, children }) => {
  return (
    <SplashBackground>
      <Container size="content" padded top={0} bottom={0}>
        <SplashInner backgroundPosition={backgroundPosition}>
          {children}
          {actions && (
            <ButtonGroup>
              {actions.map(
                ({ id, text, color, icon, iconPosition, url, external }) => {
                  let Icon
                  switch (icon) {
                    case "DiscordLogo":
                      Icon = Discord
                      break
                    case "ExternalLink":
                      Icon = ExternalLink
                      break
                    case "Download":
                      Icon = Download
                      break
                    default:
                      break
                  }
                  return (
                    <Button
                      key={id}
                      style={{ marginRight: "1rem" }}
                      color={color}
                      iconPosition={iconPosition}
                      as={external ? OutboundLink : Link}
                      to={url}
                      href={url}
                    >
                      {Icon && iconPosition === "left" && <Icon />}
                      {text}
                      {Icon && iconPosition === "right" && <Icon />}
                    </Button>
                  )
                }
              )}
            </ButtonGroup>
          )}
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
  actions: PropTypes.arrayOf(PropTypes.shape(Button.propTypes)),
}

Splash.defaultProps = {
  backgroundPosition: { x: "right", y: "30px" },
  actions: [],
}
