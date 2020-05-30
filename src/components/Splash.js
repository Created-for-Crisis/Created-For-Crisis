import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import styled from "styled-components"
import { up } from "styled-breakpoints"
import WorldVectorDark from "../assets/images/world-vector-dark.png"
import Discord from "../assets/icons/discord"
import { Container } from "./Container"
import { Button, ButtonGroup } from "./Button"
import { Download, ExternalLink } from "react-feather"

const SplashBackground = styled.header`
  background-color: ${props => props.theme.colors.blue};
  margin-top: 72px;
  ${up("lg")} {
    margin-top: 0;
  }
`

const SplashInner = styled.div`
  background-repeat: no-repeat;
  padding: 0 1rem 4rem;
  background-position-x: ${props => props.backgroundPosition.x};
  background-position-y: ${props => props.backgroundPosition.y};
  background-image: url(${WorldVectorDark});

  h1,
  p {
    color: ${props => props.theme.colors.shades.white};
  }

  h1 {
    margin-bottom: 0;
    font-size: 3rem;
    ${up("lg")} {
      font-size: 6.875rem;
    }
  }

  p {
    max-width: 731px;
    font-size: 1rem;
    font-family: ${props => props.theme.fonts.body};
    font-weight: normal;
    line-height: 2.25rem;
    ${up("lg")} {
      font-size: 1.5rem;
    }
  }

  ${ButtonGroup} {
    flex-direction: column;
    align-items: flex-start;

    a.button + a.button {
      margin: 1rem 0 0;
    }

    ${up("sm")} {
      flex-direction: row;
      align-items: center;

      a.button {
        display: inline-flex;

        & + a.button {
          margin: 0 0 0 1rem;
        }
      }
    }
  }
`

export const Splash = ({
  title,
  subtitle,
  backgroundPosition,
  actions,
  ...props
}) => {
  return (
    <SplashBackground {...props}>
      <Container size="content">
        <SplashInner backgroundPosition={backgroundPosition} {...props}>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
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
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  backgroundPosition: PropTypes.shape({
    x: PropTypes.string,
    y: PropTypes.string,
  }),
  actions: PropTypes.arrayOf(PropTypes.shape(Button.propTypes)),
}

Splash.defaultProps = {
  title: "",
  backgroundPosition: { x: "right", y: "30px" },
  actions: [],
}
