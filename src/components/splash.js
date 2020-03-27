import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { up } from "styled-breakpoints"
import { ContentContainer } from "../styles/components"

const StyledSplash = styled.section`
  .content {
    padding: 2rem 0;
    span,
    p {
      font-size: 1rem;
    }
    h1 {
      font-size: 2rem;
      margin-bottom: 0.5rem;
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

  ${up("md")} {
    .content {
      padding: 4rem 0;
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

  ${ContentContainer} {
    ${up("md")} {
      background-image: url(${props => props.image});
      background-repeat: no-repeat;
      background-position: bottom 50% right 5%;
      background-size: auto 75%;
    }
  }

  ${up("xl")} {
    min-height: 500px;
    background-size: auto 75%;
  }
`

const Splash = ({ children, image }) => {
  return (
    <StyledSplash image={image}>
      <ContentContainer>
        <div className="content">{children}</div>
      </ContentContainer>
    </StyledSplash>
  )
}

Splash.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element.isRequired),
  image: PropTypes.string,
}

Splash.defaultProps = {
  children: (
    <>
      <h1>Splash</h1>
    </>
  ),
}

export default Splash
