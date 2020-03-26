import Typography from "typography"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.5,
  headerFontFamily: ["Poppins", "Helvetica", "Arial", "sans-serif"],
  bodyFontFamily: ["Open Sans", "serif"],
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

export default typography
