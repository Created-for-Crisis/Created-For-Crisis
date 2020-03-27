import { createGlobalStyle } from "styled-components"
import { rgba } from "polished"
import typography from "./typography"

require("typeface-open-sans")
require("typeface-poppins")

const theme = {
  colors: {
    black: "#161617",
    white: "#fff",
    primary: "#DD4B50",
    secondary: "#7BBB78",
    tertiary: "#66B6E1",
    discord: "#7289DA",
    text: "#161617",
    darkGrey: "#8D8D8F",
    mediumGrey: rgba(16, 16, 17, 0.5),
    lightGrey: rgba(16, 16, 17, 0.1),
    whiteGrey: rgba(16, 16, 17, 0.02),
  },
  fonts: {
    header: '"Poppins", sans-serif',
    body: '"Open Sans", sans-serif',
    accent: '"Georgia", serif',
  },
  layout: {
    headerHeight: "56px",
  },
  breakpoints: {
    xs: "321px", // iPhone 5SE
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1040px",
    sl: "1400px", // Super Large, Additional Breakpoint
  },
}

const GlobalStyle = createGlobalStyle`
  body {
    ${typography.toString()};
    margin: 0;
    position: relative;
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fonts.body};
    *{
      box-sizing: border-box;
    }
  }
`
export { theme, GlobalStyle }
