import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { up } from "styled-breakpoints"
import cx from "classnames"
import { Container } from "../Container"
import { Button } from "../Button"
import CreatedForCrisisLogo from "../../assets/logos/CreatedForCrisisLogo.svg"
import { Menu, X } from "react-feather"
import { useKeyOnly } from "../../styles/helpers"
import { pathGenerator } from "../../util/helpers"

const StyledMasthead = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  height: 72px;
  background-color: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.shades.white};

  ${up("lg")} {
    position: relative;
  }
`

const DropdownMenu = styled.div`
  position: relative;
  display: block;

  ${up("lg")} {
    position: absolute;
    top: calc(100% + 1.5rem);
    left: 50%;
    transform: translateX(-50%);
    width: 220px;
    border-radius: 0.5rem;
    background-color: ${props => props.theme.colors.shades.white};
    box-shadow: ${props => props.theme.shadows.card};
    opacity: 0;
    visibility: hidden;

    /* To maintain the hover statee */
    &:before {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 0;
      height: 1.5rem;
      width: 100%;
      background: transparent;
    }

    /* Little Carat on top of the menu */
    &:after {
      content: "";
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 7px 7px 7px;
      border-color: transparent transparent
        ${props => props.theme.colors.shades.white} transparent;
    }
  }
  a {
    text-decoration: none;
    display: block;
    padding: 0.75rem;
    &:hover strong,
    &.active strong {
      color: ${props => props.theme.colors.shades.textLight};
    }
  }

  strong,
  span {
    display: block;
    letter-spacing: 0.7px;
    color: ${props => props.theme.colors.shades.textDark};
  }

  strong {
    font-size: 0.9rem;
    text-transform: uppercase;
  }

  span {
    font-size: 0.75rem;
  }
`

const Nav = styled.nav`
  position: absolute;
  top: 0;
  right: 0;
  width: 320px;
  height: 100vh;
  background-color: ${props => props.theme.colors.shades.muteGrey};
  padding: 4.5rem 1rem 1rem;
  transform: translateX(320px);
  will-change: transform box-shadow;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
  overflow-y: auto;

  display: flex;
  flex-direction: column;

  &.open {
    transform: translateX(0);
    box-shadow: ${props => props.theme.shadows.card};
  }

  .nav-link {
    position: relative;
    text-decoration: none;
    color: ${props => props.theme.colors.shades.textDark};
    font-weight: 500;
    font-family: ${props => props.theme.fonts.body};
    padding: 1rem;
    text-transform: uppercase;
    font-size: 1.25rem;
    letter-spacing: 1px;

    &.active {
      color: ${props => props.theme.colors.shades.textLight};
    }
  }

  a.button {
    margin: 1rem;
  }

  ${up("lg")} {
    overflow-y: visible;
    padding-top: 0;
    position: static;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0;
    width: auto;
    height: auto;
    background-color: transparent;
    transform: translateX(0);

    .nav-link,
    .dropdown-link {
      position: relative;
      padding: 0;
      text-transform: none;
      font-size: 1rem;
      color: ${props => props.theme.colors.shades.white};
    }

    .dropdown-link:hover ${DropdownMenu} {
      display: block;
      opacity: 1;
      visibility: visible;
    }

    a.nav-link + a.nav-link,
    a.nav-link + .dropdown-link,
    .dropdown-link + a.nav-link,
    a.button {
      margin: 0 0 0 3rem;
    }
  }
`

const MenuToggle = styled.div`
  display: block;
  position: absolute;
  top: 1rem;
  right: 1rem;
  height: 2.5rem;
  min-width: 2.5rem;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
  z-index: 100;
  color: ${props => props.theme.colors.shades.white};
  will-change: color;
  transition: color 0.5s ease;

  svg {
    margin-left: 1rem;
  }

  &.open {
    color: ${props => props.theme.colors.blue};
  }

  ${up("lg")} {
    display: none;
  }
`

export const Masthead = ({ user }) => {
  const [navigationOpen, setNavigationOpen] = useState(false)

  const {
    contentfulMenu: { routes },
  } = useStaticQuery(
    graphql`
      query GetPrimaryNavigation {
        contentfulMenu(slug: { eq: "primary-navigation" }) {
          id
          slug
          title
          routes {
            id
            title
            slug
            dropdownItems {
              title
              subtitle
              slug
              id
              contentfulparent {
                slug
              }
            }
          }
        }
      }
    `
  )

  return (
    <StyledMasthead>
      <Container
        padded
        top={0}
        bottom={0}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ lineHeight: 0 }}>
          <CreatedForCrisisLogo style={{ height: "40px", margin: "0" }} />
        </Link>
        <Nav
          aria-labelledby="primary-navigation"
          className={cx(
            "primary-navigation",
            useKeyOnly(navigationOpen, "open")
          )}
        >
          {routes &&
            routes.map(({ id, title, slug, dropdownItems }) =>
              dropdownItems ? (
                <span className="dropdown-link" key={id}>
                  <Link
                    to={pathGenerator(slug)}
                    activeClassName="active"
                    className="nav-link"
                    onClick={e => setNavigationOpen(false)}
                  >
                    {title}
                  </Link>
                  <DropdownMenu>
                    {dropdownItems.map(
                      ({ id, title, subtitle, slug, contentfulparent }) => (
                        <Link
                          key={id}
                          to={pathGenerator(slug, contentfulparent)}
                          activeClassName="active"
                          onClick={e => setNavigationOpen(false)}
                        >
                          <strong>{title}</strong>
                          <span>{subtitle}</span>
                        </Link>
                      )
                    )}
                  </DropdownMenu>
                </span>
              ) : (
                <Link
                  key={id}
                  to={pathGenerator(slug)}
                  activeClassName="active"
                  className="nav-link"
                  onClick={e => setNavigationOpen(false)}
                >
                  {title}
                </Link>
              )
            )}
          {/* If Logged in User show My Account button */}
          {user ? (
            <Button
              color="gold"
              as={Link}
              to={"/account/"}
              style={{ padding: 0 }}
            >
              My Account
            </Button>
          ) : (
            <Button color="green" as={Link} to={"/support/"}>
              Donate
            </Button>
          )}
        </Nav>
        <MenuToggle
          className={cx("menu-toggle", useKeyOnly(navigationOpen, "open"))}
          onClick={() => setNavigationOpen(!navigationOpen)}
        >
          {navigationOpen ? (
            <>
              Close <X />
            </>
          ) : (
            <>
              Menu <Menu />
            </>
          )}
        </MenuToggle>
      </Container>
    </StyledMasthead>
  )
}
