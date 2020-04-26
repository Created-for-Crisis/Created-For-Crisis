import { Link } from "gatsby"
import styled from "styled-components"
import { PropStyles } from "../../styles/helpers"

const LinkVariants = PropStyles("color", ({ colors }) => ({
  dark: {
    color: colors.shades.white,
  },
  light: {
    color: colors.shades.textDark,
  },
}))

const NavigationLink = styled(Link)`
  margin-right: 48px;
  text-decoration: none;

  ${LinkVariants};
`

export default NavigationLink
