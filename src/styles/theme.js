import { createGlobalStyle } from "styled-components"
import Typography from "typography"
import { rgba } from "polished"

const theme = {
  colors: {
    black: "#161617",
    white: "#fff",
    primary: "#DD4B50",
    secondary: "#7BBB78",
    tertiary: "#66B6E1",
    text: "#161617",
    darkGrey: "#8D8D8F",
    mediumGrey: rgba(16, 16, 17, 0.5),
    lightGrey: rgba(16, 16, 17, 0.1),
    whiteGrey: rgba(16, 16, 17, 0.02),
  },
  fonts: {
    header: "Poppins",
    body: "Open Sans",
    accent: "Georgia",
  },
  layout: {
    headerHeight: "56px",
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1040px",
    sl: "1400px", // Super Large, Additional Breakpoint
  },
}

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.5,
  headerFontFamily: ["Poppins", "Helvetica", "Arial", "sans-serif"],
  bodyFontFamily: ["Open Sans", "serif"],
  googleFonts: [
    {
      name: "Poppins",
      styles: ["700"],
    },
    {
      name: "Georgia",
      styles: ["400", "400i", "700", "700i"],
    },
    {
      name: "Open Sans",
      styles: ["400", "400i", "700", "700i"],
    },
  ],
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h3: {
      fontFamily: ["Georgia", "serif"].join(","),
      fontWeight: "400",
    },
    h4: {
      fontFamily: ["Georgia", "serif"].join(","),
      fontWeight: "400",
    },
    h5: {
      fontFamily: ["Georgia", "serif"].join(","),
      fontWeight: "400",
    },
  }),
})

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
