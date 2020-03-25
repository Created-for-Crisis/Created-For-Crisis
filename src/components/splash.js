import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Mail } from "react-feather"
import { up } from "styled-breakpoints"
import Button from "./button"
import { ContentContainer } from "../styles/components"
import ConnectedWorld from "../assets/connected_world.png"
import DiscordLogo from "../assets/logos/Discord-Logo-White.svg"

const StyledSplash = styled.section`
  .content {
    padding: 2rem 1rem;
    h1,
    h3,
    p {
      margin-bottom: 1rem;
    }
    span,
    p {
      font-size: 1rem;
    }
    h1 {
      font-size: 2rem;
    }
    h3 {
      font-size: 1.5rem;
    }

    span {
      font-family: ${props => props.theme.fonts.accent};
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    p {
      line-height: 1.75;
      max-width: 420px;
    }
  }

  .actions {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    .action + .action {
      margin: 1rem 0 0 0;
    }
  }

  ${up("xs")} {
    .actions {
      flex-direction: row;
      .action + .action {
        margin: 0 0 0 1rem;
      }
    }
  }

  ${up("md")} {
    .content {
      padding: 4rem 2rem;
      max-width: 720px;
      span,
      p {
        font-size: 1.25rem;
      }
      h1 {
        font-size: 4rem;
      }
    }
  }

  ${up("md")} {
    background-image: url(${ConnectedWorld});
    background-repeat: no-repeat;
    background-position: bottom 50% right 2rem;
    background-size: auto 50%;
  }

  ${up("xl")} {
    min-height: 500px;
    background-size: auto 75%;
  }
`

const Splash = () => {
  return (
    <StyledSplash>
      <ContentContainer>
        <div className="content">
          <span>We are</span>
          <h1>Created For Crisis,</h1>
          <p>
            We’re here to solve problems faced by healthcare providers during
            the COVID-19 pandemic and beyond.
          </p>
          <h3>Let us do what we do best so you can, too.</h3>
          <div className="actions">
            <Button
              variant="primary"
              as="a"
              href="mailto:info@createdforcrisis.org"
              target="_blank"
              className="action"
            >
              Contact Us <Mail />
            </Button>
            <Button
              variant="discord"
              as="a"
              href="https://discord.gg/T2Xw2j7"
              target="_blank"
              className="action"
            >
              Get Involved <DiscordLogo />
            </Button>
          </div>
        </div>
      </ContentContainer>
    </StyledSplash>
  )
}

Splash.propTypes = {
  inverted: PropTypes.bool,
}

Splash.defaultProps = {
  inverted: false,
}

export default Splash
