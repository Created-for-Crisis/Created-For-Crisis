import { createGlobalStyle } from "styled-components"
import { rgba } from "polished"

require("typeface-open-sans")
require("typeface-crimson-text")

const theme = {
  colors: {
    blue: "#10375C",
    green: "#00C756",
    red: "#D7385E",
    purple: "#844685",
    gold: "#F3C623",
    shades: {
      white: "#FFFFFF",
      loudGrey: "#D7DDDD",
      plainGrey: "#F0F4F4",
      muteGrey: "#F8FCFD",
      textDark: "#102336",
      textMedium: "#5B7A82",
      textLight: "#289FBA",
    },
    brands: {
      discord: "#7289DA",
      linkedin: "#0B66C1",
      youtube: "#FF0000",
      instagram: "#8a3ab9",
      facebook: "#3B5998",
      twitter: "#55ACEE",
      github: "#24292E",
    },
  },
  shadows: {
    button: `0px 1px 3px ${rgba(0, 0, 0, 0.08)}, 0px 4px 6px ${rgba(
      50,
      50,
      93,
      0.11
    )}`,
    buttonActive: `0px 3px 6px ${rgba(0, 0, 0, 0.08)}, 0px 4px 14px ${rgba(
      0,
      0,
      0,
      0.25
    )}`,
    card: `0px -6px 16px ${rgba(0, 0, 0, 0.025)}, 0px 8px 16px ${rgba(
      0,
      0,
      0,
      0.03
    )}, 0px 13px 27px ${rgba(50, 50, 93, 0.25)}`,
    cardActive: `0px -12px 36px ${rgba(0, 0, 0, 0.025)}, 0px 18px 36px ${rgba(
      0,
      0,
      0,
      0.03
    )}, 0px 30px 60px ${rgba(50, 50, 93, 0.25)}`,
  },
  fonts: {
    header: '"Crimson Text", "Helvetica", serif',
    body: '"Open Sans", sans-serif',
  },
  layout: {
    headerHeight: "72px",
    spacer: "10px",
  },
  breakpoints: {
    xs: "321px", // iPhone 5SE
    sm: "576px",
    article: "640px",
    md: "768px",
    lg: "992px",
    xl: "1040px",
    content: "1040px",
    sl: "1400px", // Super Large, Additional Breakpoint
  },
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    position: relative;
    color: ${props => props.theme.colors.shades.textDark};
    font-family: ${props => props.theme.fonts.body};
    *{
      box-sizing: border-box;
    }
  }
`
export { theme, GlobalStyle }
