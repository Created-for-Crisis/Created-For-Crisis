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

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}
