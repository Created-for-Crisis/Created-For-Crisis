import Typography from "typography"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.666,
  headerFontFamily: ["Crimson Text", "Helvetica", "serif"],
  headerWeight: 400,
  headerColor: "#102336",
  bodyFontFamily: ["Open Sans", "sans-serif"],
  bodyColor: "#102336",
  googleFonts: [
    {
      name: "Crimson Text",
      styles: ["400", "700"],
    },
    {
      name: "Open Sans",
      styles: ["400", "400i", "600", "700", "700i"],
    },
  ],
  scaleRatio: 2.5,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h1: {
      fontSize: "6.875rem",
    },
    h3: {
      fontSize: "1.25rem",
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontWeight: "600",
      textTransform: "uppercase",
      color: "#5B7A82",
    },
    h4: {
      fontSize: "1.15rem",
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontWeight: "600",
      textTransform: "uppercase",
      color: "#5B7A82",
    },
    h5: {
      fontSize: "1rem",
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontWeight: "600",
      textTransform: "uppercase",
      color: "#5B7A82",
    },
    h6: {
      fontSize: "1.5rem",
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontWeight: "normal",
      lineHeight: "2.25rem",
    },
  }),
})

export default typography
