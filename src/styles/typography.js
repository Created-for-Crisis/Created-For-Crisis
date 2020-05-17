import Typography from "typography"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.666,
  headerFontFamily: ["Crimson Text", "Helvetica", "serif"],
  headerWeight: 400,
  headerColor: "#102336",
  bodyFontFamily: ["Open Sans", "sans-serif"],
  bodyColor: "#102336",
  scaleRatio: 2.5,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
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
  }),
})

export default typography
