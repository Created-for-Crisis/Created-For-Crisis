import React from "react"
import styled, { keyframes } from "styled-components"
import PropTypes from "prop-types"
import { lighten } from "polished"
import cx from "classnames"
import {
  PropStyles,
  getUnhandledProps,
  getElementType,
  useValueAndKey,
  useKeyOnly,
} from "../styles/helpers"

// Keyframe Load Animation
const load = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

/*
 ** Color Variants
 */
const ButtonVariants = PropStyles("color", ({ colors }) => ({
  blue: {
    color: colors.shades.white,
    backgroundColor: colors.blue,
    "&:hover, &:focus, &:active": {
      backgroundColor: lighten(0.05, colors.blue),
    },
  },
  green: {
    color: colors.shades.white,
    backgroundColor: colors.green,
    "&:hover, &:focus, &:active": {
      backgroundColor: lighten(0.05, colors.green),
    },
  },
  gold: {
    color: colors.shades.textDark,
    backgroundColor: colors.gold,
    "&:hover, &:focus, &:active": {
      backgroundColor: lighten(0.05, colors.gold),
    },
  },
}))

/*
 ** Icon Position Variations
 */
const ButtonIconPositions = PropStyles("iconPosition", ({ colors }) => ({
  left: {
    svg: {
      marginRight: ".5rem",
    },
  },
  right: {
    svg: {
      marginLeft: ".5rem",
    },
  },
}))

const StyledButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  font-family: ${props => props.theme.fonts.body};
  font-weight: 600;
  border-radius: 0.25rem;
  letter-spacing: 0.5px;
  padding: 0.25rem 1rem;
  height: 40px;
  text-transform: uppercase;
  border: none;
  transition: all 0.15s ease;
  text-decoration: none;
  cursor: pointer;
  will-change: background-color transform box-shadow;

  svg {
    height: 1.25rem;
    width: auto;
    margin: 0 auto;
  }

  ${ButtonVariants};
  ${ButtonIconPositions};

  box-shadow: ${props => props.theme.shadows.button};

  &:hover,
  &:focus,
  &:active {
    box-shadow: ${props => props.theme.shadows.buttonActive};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.25;
    cursor: not-allowed;
  }

  /* Loader Styles */
  &.loading {
    cursor: progress;
  }
  .loader,
  .loader:after {
    border-radius: 50%;
    width: 1.25rem;
    height: 1.25rem;
  }

  .loader {
    position: relative;
    font-size: 1rem;
    margin-left: 1rem;
    text-indent: -9999em;
    border-top: 0.1em solid rgba(255, 255, 255, 0.2);
    border-right: 0.1em solid rgba(255, 255, 255, 0.2);
    border-bottom: 0.1em solid rgba(255, 255, 255, 0.2);
    border-left: 0.1em solid
      ${props =>
        props.color === "primary"
          ? props.theme.colors.white
          : props.theme.colors.primary};
    animation: ${load} 1.1s infinite linear;
  }
`

export const Button = props => {
  const { children, loading, disabled, iconPosition, color, size } = props

  const classes = cx(
    color,
    size,
    useValueAndKey(iconPosition, "icon"),
    useKeyOnly(loading)
  )
  const rest = getUnhandledProps(Button, props)
  const ElementType = getElementType(Button, props)

  return (
    <StyledButton
      as={ElementType}
      color={color}
      iconPosition={iconPosition}
      {...rest}
      className={classes}
      disabled={(disabled && ElementType === "button") || undefined}
    >
      {children}
      {loading && <span className="loader" />}
    </StyledButton>
  )
}

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  ${StyledButton} + ${StyledButton} {
    margin-left: 1rem;
  }
`

Button.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    "blue",
    "green",
    "gold",
    "red",
    "purple",
    "white",
    "discord",
  ]),
  iconPosition: PropTypes.oneOf(["left", "right"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
}

Button.defaultProps = {
  as: "button",
  children: "Button",
  color: "blue",
}
