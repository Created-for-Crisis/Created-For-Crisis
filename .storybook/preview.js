import "@storybook/addon-console"
import React from "react"
import { addParameters, addDecorator } from "@storybook/react"
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport"
import { ThemeProvider } from "styled-components"
import { TypographyStyle } from "react-typography"
import { theme, GlobalStyle } from "../src/styles/theme"
import typography from "../src/styles/typography"
import { Container } from "../src/components/Container"

// Add Viewport Parameters
addParameters({
  viewport: {
    viewports: {
      ...MINIMAL_VIEWPORTS,
    },
  },
})

// Add Styled Components Theme to all stories
addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <TypographyStyle typography={typography} />
    <Container size="full">{storyFn()}</Container>
  </ThemeProvider>
))
