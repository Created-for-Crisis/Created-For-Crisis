import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import styled from "styled-components"
import { up } from "styled-breakpoints"
import { Container } from "../Container"
import { Button, ButtonGroup } from "../Button"
import Discord from "../../assets/icons/discord"
import { Code, Heart } from "react-feather"
import { SocialNetworks } from "./SocialNetworks"
import { pathGenerator } from "../../util/helpers"

const StyledFooter = styled.footer`
  background-color: ${props => props.theme.colors.shades.muteGrey};

  ${up("md")} {
    padding: 1.5rem 0;
  }
`

const Callout = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  ${up("md")} {
    flex-direction: row;
    align-items: center;
  }

  .text p {
    text-align: center;
    margin: 0;
    font-size: 1rem;
    color: ${props => props.theme.colors.shades.textDark};
    line-height: 1.5;
    letter-spacing: 0.5px;
    &.thin {
      color: ${props => props.theme.colors.shades.textLight};
      font-weight: 300;
    }

    ${up("xs")} {
      font-size: 1.25rem;
    }

    ${up("md")} {
      text-align: left;
      font-size: 1.35rem;
    }
    ${up("lg")} {
      font-size: 1.85rem;
    }
  }

  ${ButtonGroup} {
    flex: 1 0 auto;
    justify-content: center;
    flex-wrap: wrap;
    a.button {
      flex: 1 0 190px;
      margin: 1rem 0 0;
      ${up("xs")} {
        & + a.button {
          margin: 1rem 0 0 1rem;
        }
      }
      ${up("sm")} {
        flex-grow: 0;
      }
      ${up("md")} {
        margin: 0;
        & + a.button {
          margin: 0 0 0 1rem;
        }
        flex: 0 0 auto;
      }
    }

    ${up("md")} {
      justify-content: flex-end;
      flex: 1 0 360px;
    }
  }
`

const Meta = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column-reverse;
  .half {
    width: 100%;
    flex: 1 0 auto;
  }

  ${up("lg")} {
    margin-top: 4rem;
    flex-direction: row;
    .half {
      width: auto;
    }
  }
`

const FooterMenu = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
  a {
    margin-bottom: 1rem;
    flex: 1 0 120px;
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

  ${up("sm")} {
    a {
      flex: 1 0 auto;
    }
  }

  ${up("lg")} {
    a {
      flex-grow: 0;
    }

    a + a {
      margin-left: 3rem;
    }
  }
`

const Copyright = styled.p`
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: column;
  font-size: 0.95rem;

  span + a,
  a + a {
    margin-top: 1rem;
  }

  ${up("sm")} {
    flex-direction: row;
    justify-content: center;
    span + a,
    a + a {
      position: relative;
      margin: 0 0 0 1rem;
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
  }

  ${up("lg")} {
    justify-content: flex-start;
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

export const Footer = () => {
  const {
    contentfulMenu: { routes },
  } = useStaticQuery(
    graphql`
      query GetFooterNavigation {
        contentfulMenu(slug: { eq: "footer-navigation" }) {
          id
          slug
          title
          routes {
            id
            title
            slug
            contentfulparent {
              slug
            }
          }
        }
      }
    `
  )
  return (
    <StyledFooter>
      <Container size="content" padded>
        <Callout>
          <div className="text">
            <p className="thin">Able to lend a hand?</p>
            <p>Get in touch or contribute a donation.</p>
          </div>
          <ButtonGroup>
            <Button color="green" as={Link} to={"/support/"}>
              Donate
            </Button>
            <Button
              color="discord-inverse"
              iconPosition="left"
              as={OutboundLink}
              target="_blank"
              href={"https://discord.gg/T2Xw2j7"}
            >
              <Discord /> Get Involved
            </Button>
          </ButtonGroup>
        </Callout>
        <Meta>
          <div className="half left">
            <FooterMenu aria-labelledby="footer-navigation">
              <Link to={"/"} activeClassName="active">
                Home
              </Link>
              {routes &&
                routes.map(({ id, title, slug, contentfulparent }) => (
                  <Link
                    key={id}
                    to={pathGenerator(slug, contentfulparent)}
                    activeClassName="active"
                  >
                    {title}
                  </Link>
                ))}
            </FooterMenu>
            <Copyright>
              <span>&copy; 2020 Created for Crisis Inc.</span>
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
}
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
    // {
    //   title: "My Account",
    //   link: "/account/",
    // },
  ],
}
