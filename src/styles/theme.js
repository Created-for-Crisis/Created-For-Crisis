import { rgba } from "polished"

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
    header: '"Georgia", serif',
    body: '"Open Sans", sans-serif',
    accent: '"Poppins", sans-serif',
  },
  layout: {
    headerHeight: "80px",
  },
  breakpoints: {
    xs: "321px", // iPhone 5SE
    sm: "560px",
    md: "768px",
    lg: "992px",
    xl: "1136px",
    sl: "1400px", // Super Large, Additional Breakpoint
  },
}

export { theme }
