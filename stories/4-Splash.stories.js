import React from "react"
import { withKnobs, boolean, text } from "@storybook/addon-knobs"
import { Splash } from "../src/components/Splash"

export default {
  title: "Splash",
  component: Splash,
  decorators: [withKnobs],
}

export const Dynamic = () => (
  <Splash
    title={text("Title", "Created for Crisis")}
    subtitle={text(
      "Subtitle",
      "We’re here to solve problems faced by healthcare providers during the COVID-19 pandemic and beyond."
    )}
    actions={
      boolean("Show Actions", true)
        ? [
            {
              text: "Contact Us",
              color: "plain",
              id: "0ac5436f-0084-5340-bf76-c5b5a090aea6",
              url: "mailto:info@createdforcrisis.org",
              external: true,
            },
            {
              text: "Get Involved",
              color: "discord",
              icon: "DiscordLogo",
              iconPosition: "left",
              id: "b71beea9-0bf9-5d92-b28f-df0378adfb19",
              url: "https://discord.gg/T2Xw2j7",
              external: true,
            },
          ]
        : []
    }
  />
)
