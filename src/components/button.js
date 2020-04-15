import PropTypes from "prop-types"
import styled from "styled-components"
import { lighten, darken } from "polished"
import { PropStyles } from "../styles/helpers"

/*
 ** Variations of Buttons Based on props.variant
 */
const ButtonVariants = PropStyles("variant", ({ colors }) => {
  return {
    primary: {
      color: colors.white,
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      "&:hover, &:focus, &:active": {
        backgroundColor: darken(0.05, colors.primary),
      },
    },
    secondary: {
      color: colors.white,
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
      "&:hover, &:focus, &:active": {
        backgroundColor: darken(0.05, colors.secondary),
      },
    },
    tertiary: {
      color: colors.white,
      backgroundColor: colors.tertiary,
      borderColor: colors.tertiary,
      "&:hover, &:focus, &:active": {
        backgroundColor: darken(0.05, colors.tertiary),
      },
    },
    dark: {
      color: colors.white,
      backgroundColor: colors.text,
      borderColor: colors.text,
      "&:hover, &:focus, &:active": {
        backgroundColor: lighten(0.05, colors.text),
      },
    },
    grey: {
      color: colors.mediumGrey,
      backgroundColor: colors.whiteGrey,
      borderColor: colors.lightGrey,
      "&:hover, &:focus, &:active": {
        backgroundColor: colors.lightGrey,
        color: colors.text,
      },
    },
    discord: {
      color: colors.discord,
      backgroundColor: "transparent",
      borderColor: "transparent",
      "&:hover, &:focus, &:active": {
        backgroundColor: colors.whiteGrey,
        color: colors.discord,
      },
      svg: {
        fill: colors.discord,
      },
    },
  }
})

/*
 ** Variations of Buttons Based on props.variant
 */
const ButtonSizes = PropStyles("size", ({ colors }) => {
  return {
    sm: {
      fontSize: ".75rem",
      padding: ".25rem 1rem",
      svg: {
        height: ".75rem",
      },
    },
    md: {
      fontSize: "1rem",
      padding: ".5rem 1.25rem",
      svg: {
        height: "1rem",
      },
    },
    lg: {
      fontSize: "1.25rem",
      padding: ".75rem 1.5rem",
      svg: {
        height: "1.25rem",
      },
    },
  }
})

const Button = styled.button`
  font-family: ${props => props.theme.fonts.accent};
  font-weight: 400;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
  text-decoration: none;
  ${ButtonVariants};
  ${ButtonSizes};
  &:hover {
    cursor: pointer;
  }
  &:focus,
  &:active {
    outline: none;
  }

  svg {
    width: auto;
    margin-left: 1rem;
  }
`

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
}

Button.defaultProps = {
  variant: "primary",
  size: "md",
}

export default Button
