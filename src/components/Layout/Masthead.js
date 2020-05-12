import React, { useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { up } from "styled-breakpoints"
import cx from "classnames"
import { Container } from "../Container"
import { Button } from "../Button"
import CreatedForCrisisLogo from "../../assets/logos/CreatedForCrisisLogo.svg"
import { Menu, X } from "react-feather"
import { useKeyOnly } from "../../styles/helpers"

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

  a:not(.button) {
    text-decoration: none;
    color: ${props => props.theme.colors.shades.textDark};
    font-weight: 500;
    font-family: ${props => props.theme.fonts.body};
    padding: 1rem;
    text-transform: uppercase;
    font-size: 1.25rem;
    letter-spacing: 1px;
  }

  a.button {
    margin: 1rem;
  }

  ${up("lg")} {
    overflow-y: none;
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

    a:not(.button) {
      padding: 0;
      text-transform: none;
      font-size: 1rem;
      color: ${props => props.theme.colors.shades.white};
    }

    a + a,
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

export const Masthead = ({ user, routes }) => {
  const [navigationOpen, setNavigationOpen] = useState(false)

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
            routes.map(({ title, slug }, i) => (
              <Link
                key={i}
                to={`/${slug}/`}
                activeClassName="active"
                onClick={e => setNavigationOpen(false)}
              >
                {title}
              </Link>
            ))}
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

Masthead.defaultProps = {
  routes: [
    {
      title: "About",
      slug: "about",
    },
    {
      title: "News",
      slug: "news",
    },
    {
      title: "Projects",
      slug: "projects",
    },
    {
      title: "Support",
      slug: "support",
    },
  ],
}
