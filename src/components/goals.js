import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { up } from "styled-breakpoints"
import { ContentContainer } from "../styles/components"
import GoalsTargets from "../assets/target_goals.png"

const StyledGoals = styled.section`
  margin-top: 2rem;

  ${ContentContainer} {
    display: flex;
    align-items: center;
  }

  img {
    display: none;
    width: 100%;
    height: auto;
    ${up("md")} {
      display: block;
    }
  }

  .content {
    ${up("md")} {
      flex: 1 0 auto;
      max-width: 540px;
      padding: 3rem 0 3rem 2rem;
      margin: 1rem 0 1rem auto;
    }
  }
`

const Goals = () => {
  return (
    <StyledGoals>
      <ContentContainer>
        <img src={GoalsTargets} alt="Goals &amp; Targets Illustration" />
        <div className="content">
          <h2>We have two primary goals:</h2>
          <p>
            1: Provide high quality, efficient, and validated designs for masks
            to makers around the country.
          </p>
          <p>
            2: Match hospitals and healthcare providers in need of equipment
            with makers and volunteers located globally to get them supplies
            that may be useful in the event of a dire shortage of PPE.
          </p>
        </div>
      </ContentContainer>
    </StyledGoals>
  )
}

Goals.propTypes = {
  inverted: PropTypes.bool,
}

Goals.defaultProps = {
  inverted: false,
}

export default Goals
