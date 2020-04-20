import React from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { PropStyles } from "../styles/helpers"

/*
 ** Size Variations
 */
const ContainerSizes = PropStyles("size", ({ breakpoints }) => ({
  article: {
    maxWidth: breakpoints.article,
  },
  content: {
    maxWidth: breakpoints.content,
  },
  full: {
    maxWidth: "100%",
  },
}))

const StyledContainer = styled.div`
  margin: 0 auto;
  padding: ${props =>
    !props.padded
      ? "0"
      : `${props.top} ${props.right} ${props.bottom} ${props.left}`};

  ${ContainerSizes};
`

export const Container = props => (
  <StyledContainer {...props}>{props.children}</StyledContainer>
)

Container.propTypes = {
  padded: PropTypes.bool,
  size: PropTypes.oneOf(["full", "content", "article"]),
}

Container.defaultProps = {
  padded: false,
  top: "1.25rem",
  right: "1.25rem",
  bottom: "1.25rem",
  left: "1.25rem",
  size: "full",
}
