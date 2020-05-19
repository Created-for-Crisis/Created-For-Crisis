import React from "react"
import { withKnobs, text, boolean, select } from "@storybook/addon-knobs"
import { withA11y } from "@storybook/addon-a11y"
import { Container } from "../src/components/Container"
import { CardGrid, Card } from "../src/components/Card"

export default {
  title: "Card",
  component: Card,
  decorators: [withKnobs, withA11y],
}

export const Dynamic = () => (
  <Container padded size="content">
    <CardGrid columns={2}>
      <Card
        title={text(
          "Title",
          "How To Make A Coronavirus Face Mask Out Of A T-Shirt"
        )}
        image={
          boolean("Show Image", false)
            ? {
                title: "Unsplash Daily",
                fluid: {
                  base64:
                    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAQCAwMDAgQDAwMEBAQEBQkGBQUFBQsICAYJDQsNDQ0LDAwOEBQRDg8TDwwMEhgSExUWFxcXDhEZGxkWGhQWFxb/2wBDAQQEBAUFBQoGBgoWDwwPFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhb/wAARCAAJABQDASIAAhEBAxEB/8QAGgAAAQUBAAAAAAAAAAAAAAAAAAIDBAUGB//EAC4QAAECBAIFDQAAAAAAAAAAAAECBAADBREGIQgSMUGyBxMUIjI2OEJzdHWhw//EABYBAQEBAAAAAAAAAAAAAAAAAAQCBf/EAB8RAAICAgEFAAAAAAAAAAAAAAECAxEABDESQWFx0f/aAAwDAQACEQMRAD8AbwthXGLqhVyiYIbSpDRbxLtwmpO0Twk2ITq2AIuEi5TfPeNkRMbOXWHKRKkFnPS+UgGbLVcISfMEqyOrkSN9iM4zmhj4k3fwU/8AOOmaSHYa+hO44DIBHrE8mhXi6+5q65V5xH0irPb3zlLT2bquspVQoVQddGUgJUjnFXlzAOsk57c/uCE8jHdSd7tXAiCIRrUHDysFcqBn/9k=",
                  aspectRatio: 1,
                  src:
                    "//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=60&h=60&q=100&fit=thumb&f=center",
                  srcSet:
                    "//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=15&h=15&q=100&fit=thumb&f=center 15w,↵//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=30&h=30&q=100&fit=thumb&f=center 30w,↵//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=60&h=60&q=100&fit=thumb&f=center 60w,↵//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=90&h=90&q=100&fit=thumb&f=center 90w,↵//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=120&h=120&q=100&fit=thumb&f=center 120w,↵//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=180&h=180&q=100&fit=thumb&f=center 180w,↵//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=636&h=636&q=100&fit=thumb&f=center 636w",
                  srcWebp:
                    "//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=60&h=60&q=100&fm=webp&fit=thumb&f=center",
                  srcSetWebp:
                    "//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=15&h=15&q=100&fm=webp&fit=thumb&f=center 15w,↵//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=30&h=30&q=100&fm=webp&fit=thumb&f=center 30w,↵//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=60&h=60&q=100&fm=webp&fit=thumb&f=center 60w,↵//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=90&h=90&q=100&fm=webp&fit=thumb&f=center 90w,↵//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=120&h=120&q=100&fm=webp&fit=thumb&f=center 120w,↵//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=180&h=180&q=100&fm=webp&fit=thumb&f=center 180w,↵//images.ctfassets.net/jhf05l21bp01/5yqBuX3tExpD0seNld0TOn/3c79c2d3b4583fcf9b04191296c4abc8/abc11-preview.jpeg?w=636&h=636&q=100&fm=webp&fit=thumb&f=center 636w",
                  sizes: "(max-width: 60px) 100vw, 60px",
                },
              }
            : null
        }
        source={text("Source", "abc11.com")}
        date={text("Date", "April 9th, 2020")}
        shadow={boolean("Shadow", true)}
      />
    </CardGrid>
  </Container>
)

export const Grids = () => (
  <Container padded size="content">
    <h4>2 Column Grid</h4>
    <CardGrid columns={2}>
      <Card />
      <Card />
      <Card />
      <Card />
    </CardGrid>
  </Container>
)
