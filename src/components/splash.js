import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Mail } from "react-feather"
import { up } from "styled-breakpoints"
import Button from "./button"
import { ContentContainer } from "../styles/components"
import ConnectedWorld from "../assets/connected_world.png"

const StyledSplash = styled.section`
  .content {
    padding: 2rem 1rem;
    span,
    p {
      font-size: 1rem;
    }
    h1 {
      margin: 0;
      font-size: 2rem;
    }

    span {
      font-family: ${props => props.theme.fonts.accent};
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    p {
      line-height: 1.75;
    }
  }

  .actions {
    display: flex;
    .action + .action {
      margin-left: 1rem;
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
      p {
        max-width: 500px;
      }
    }
  }

  ${up("xl")} {
    padding: 4rem 0;
    min-height: 600px;
    background-image: url(${ConnectedWorld});
    background-repeat: no-repeat;
    background-position: bottom right;
    background-size: 50%;
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
            a nationwide group of individuals who have come together in a time
            of crisis to solve important problems; we are a group of sewists,
            engineers, medical professionals, and makers who believe that
            open-sourced designs and dispersed manufacturing can help fill
            critical needs.
          </p>
          <div className="actions">
            <Button
              variant="primary"
              as="a"
              href="mailto:info@createdforcrisis.org"
              target="_blank"
              className="action"
            >
              <Mail /> Contact Us
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
