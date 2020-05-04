import React from "react"
import styled, { withTheme } from "styled-components"
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from "react-feather"
import { OutboundLink } from "gatsby-plugin-google-analytics"

const Socials = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  a {
    margin-left: 2rem;
    text-decoration: none;
    color: ${props => props.theme.colors.shades.textDark};
  }

  svg {
    height: 20px;
    width: auto;
    /* YouTube's Polygon */
    polygon {
      fill: ${props => props.theme.colors.shades.white};
      stroke: ${props => props.theme.colors.shades.white};
    }
  }
`

export const SocialNetworks = ({ networks }) => (
  <Socials aria-labelledby="social-networks-navigation">
    {networks.map(({ name, Icon, link }, i) => (
      <OutboundLink key={i} href={link} target="_blank" className={name}>
        <Icon />
      </OutboundLink>
    ))}
  </Socials>
)

SocialNetworks.defaultProps = {
  networks: [
    {
      name: "Facebook",
      link: "https://facebook.com/createdforcrisis",
      Icon: withTheme(({ theme }) => (
        <Facebook
          style={{
            strokeWidth: 1,
            fill: theme.colors.brands.facebook,
            stroke: theme.colors.brands.facebook,
          }}
        />
      )),
    },
    {
      name: "Linkedin",
      link: "https://linkedin.com/company/createdforcrisis",
      Icon: withTheme(({ theme }) => (
        <Linkedin
          style={{
            strokeWidth: 1,
            fill: theme.colors.brands.linkedin,
            stroke: theme.colors.brands.linkedin,
          }}
        />
      )),
    },
    {
      name: "Twitter",
      link: "https://twitter.com/Created4Crisis",
      Icon: withTheme(({ theme }) => (
        <Twitter
          style={{
            strokeWidth: 1,
            fill: theme.colors.brands.twitter,
            stroke: theme.colors.brands.twitter,
          }}
        />
      )),
    },
    {
      name: "Instagram",
      link: "https://www.instagram.com/created.for.crisis/",
      Icon: withTheme(({ theme }) => (
        <Instagram
          className="instagram"
          style={{
            strokeWidth: 2,
            stroke: theme.colors.brands.instagram,
          }}
        />
      )),
    },
    {
      name: "Youtube",
      link:
        "https://www.youtube.com/channel/UCzO2-gs16xVqwH5TR4QK_Tg?view_as=subscriber",
      Icon: withTheme(({ theme }) => (
        <Youtube
          style={{
            strokeWidth: 2,
            fill: theme.colors.brands.youtube,
            stroke: theme.colors.brands.youtube,
          }}
        />
      )),
    },
  ],
}
