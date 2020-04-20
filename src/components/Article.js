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

const StyledArticle = styled.article`
  margin: 0 auto;
`

export const Article = props => (
  <StyledArticle {...props}>{props.children}</StyledArticle>
)

Article.propTypes = {
  children: PropTypes.node,
}

Article.defaultProps = {}
