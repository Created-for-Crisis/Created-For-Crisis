import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import cx from "classnames"
import {
  getUnhandledProps,
  getElementType,
  useKeyOnly,
} from "../styles/helpers"

const StyledHeader = styled.header`
  &.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

export const Header = ({ flex, children, ...props }) => {
  const classes = cx("header", useKeyOnly(flex, "flex"))
  const rest = getUnhandledProps(Header, props)
  const ElementType = getElementType(Header, props)

  return (
    <StyledHeader as={ElementType} className={classes} {...rest}>
      {children}
    </StyledHeader>
  )
}

Header.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  flex: PropTypes.bool,
}

Header.defaultProps = {
  as: "header",
  flex: false,
}
