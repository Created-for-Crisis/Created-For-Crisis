import React from "react"
import { Link } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import styled from "styled-components"
import { Container } from "../Container"
import { Button, ButtonGroup } from "../Button"
import Discord from "../../assets/icons/discord"
import { Code, Heart } from "react-feather"
import { SocialNetworks } from "./SocialNetworks"

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.shades.muteGrey};
  padding: 1.5rem 0;
`

const Callout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .text p {
    margin: 0;
    font-size: 1.85rem;
    color: ${props => props.theme.colors.shades.textDark};
    line-height: 1.5;
    letter-spacing: 0.5px;
    &.thin {
      color: ${props => props.theme.colors.shades.textLight};
      font-weight: 300;
    }
  }
`

const Meta = styled.div`
  margin-top: 4rem;
  display: flex;
  align-items: flex-start;
  .half {
    flex: 1 0 auto;
  }
`

const FooterMenu = styled.nav`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  a + a {
    margin-left: 3rem;
  }
  a {
    font-weight: 600;
    color: ${props => props.theme.colors.shades.textDark};
    text-decoration: none;
    will-change: color;
    transition: all 0.15s ease;

    &:hover,
    &.active {
      color: ${props => props.theme.colors.shades.textLight};
    }
  }
`

const Copyright = styled.p`
  margin: 0;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  span + span,
  span + a,
  a + a {
    position: relative;
    margin-left: 1rem;
    padding-left: 1rem;

    &:before {
      content: "";
      height: 4px;
      width: 4px;
      background-color: ${props => props.theme.colors.shades.textDark};
      border-radius: 50%;
      position: absolute;
      top: calc(50% - 1px);
      left: 0;
      transform: traslateY(-50%);
    }
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.shades.textDark};
  }

  a.github {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    transition: all 0.1s ease-in;
    svg {
      height: 1.25rem;
      &.code {
        stroke: ${props => props.theme.colors.green};
        margin-right: 0.25rem;
      }
      &.heart {
        margin-left: 0.25rem;
        stroke: ${props => props.theme.colors.red};
      }
    }
  }
`

export const Footer = ({ routes }) => (
  <StyledFooter>
    <Container size="content" padded>
      <Callout>
        <div className="text">
          <p className="thin">Able to lend a hand?</p>
          <p>Get in touch or contribute a donation.</p>
        </div>
        <ButtonGroup>
          <Button color="green" as={Link} to={"/donate/"}>
            Donate
          </Button>
          <Button
            color="discord-inverse"
            iconPosition="left"
            as={OutboundLink}
            target="_blank"
            href={"https://discord.gg/T2Xw2j7"}
            style={{ marginLeft: "2rem" }}
          >
            <Discord /> Get Involved
          </Button>
        </ButtonGroup>
      </Callout>
      <Meta>
        <div className="half left">
          <FooterMenu aria-labelledby="footer-navigation">
            {routes &&
              routes.map(({ title, link }, i) => (
                <Link key={i} to={link} activeClassName="active">
                  {title}
                </Link>
              ))}
          </FooterMenu>
          <Copyright>
            <span>&copy; 2020 Created for Crisis</span>
            <OutboundLink
              href="mailto:info@createdforcrisis.org"
              target="_blank"
            >
              info@createdforcrisis.org
            </OutboundLink>
            <OutboundLink
              href="https://github.com/Rekenna/Created-For-Crisis"
              target="_blank"
              className="github"
            >
              <Code className="code" /> + <Heart className="heart" />
            </OutboundLink>
          </Copyright>
        </div>
        <div className="half right">
          <SocialNetworks />
        </div>
      </Meta>
    </Container>
  </StyledFooter>
)

Footer.defaultProps = {
  routes: [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about/",
    },
    {
      title: "News",
      link: "/news/",
    },
    {
      title: "Projects",
      link: "/projects/",
    },
    {
      title: "Support",
      link: "/support/",
    },
  ],
}
