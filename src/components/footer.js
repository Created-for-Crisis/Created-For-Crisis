import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { ContentContainer } from "../styles/components"

const StyledFooter = styled.section`
  padding: 2rem 1rem;
  text-align: center;
  p {
    margin: 0;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <ContentContainer>
        <p>© {new Date().getFullYear()} Created for Crisis</p>
      </ContentContainer>
    </StyledFooter>
  )
}

Footer.propTypes = {
  inverted: PropTypes.bool,
}

Footer.defaultProps = {
  inverted: false,
}

export default Footer
