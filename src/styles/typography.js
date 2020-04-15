import Typography from "typography"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.666,
  headerFontFamily: ["Georgia", "Helvetica", "serif"],
  headerWeight: 400,
  bodyFontFamily: ["Open Sans", "sans-serif"],
  googleFonts: [
    {
      name: "Poppins",
      styles: ["400", "700"],
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
  scaleRatio: 4,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h1: {
      fontSize: "5rem",
    },
    h2: {
      marginTop: rhythm(2),
    },
    h3: {
      marginTop: rhythm(1.5),
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontWeight: "700",
    },
    h4: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontWeight: "700",
    },
    h5: {
      fontFamily: ["Open Sans", "sans-serif"].join(","),
      fontWeight: "700",
    },
  }),
})

export default typography
