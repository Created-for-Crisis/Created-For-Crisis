import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { rgba } from "polished"
import { Menu } from "react-feather"
import { up } from "styled-breakpoints"
import { ContentContainer } from "../styles/components"
import MobileMenu from "./mobileMenu"
import Logo from "../assets/logos/CreatedForCrisis-Logo.svg"
import { withFirebase } from "./Firebase"
import Navigation from "./Navigation"

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  transition: all 0.25s ease-in-out;
  background: ${props => rgba(props.theme.colors.white, 0.95)};

  ${ContentContainer} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${props => props.theme.layout.headerHeight};
  }

  nav {
    display: none;
  }

  &.scrolling {
    box-shadow: 12px 30px 0px rgba(16, 16, 17, 0.0003),
      3.4px 8px 0px rgba(16, 16, 17, 0.0007), 1px 2px 0px rgba(16, 16, 17, 0.02);
  }

  .menu-trigger {
    cursor: pointer;
    background: ${props => props.theme.colors.white};
    border: none;
    box-shadow: none;
    position: relative;
    height: 32px;
    width: 32px;
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  ${up("md")} {
    nav {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      a:not(.button) {
        position: relative;
        margin-right: 2.5rem;
        padding: 0 0.5rem;
        font-size: 0.85rem;
        font-family: ${props => props.theme.fonts.header};
        color: ${props => props.theme.colors.mediumGrey};
        font-weight: 400;
        text-decoration: none;
        transition: all 0.15s ease-in-out;
        &:after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 0%;
          height: 2px;
          background-color: ${props => props.theme.colors.text};
          transition: all 0.15s ease-in-out;
        }
        &:hover,
        &:focus,
        &:active,
        &.active {
          color: ${props => props.theme.colors.text};
          &:after {
            width: 100%;
          }
        }
      }
    }

    .menu-trigger {
      display: none;
    }
  }
`

/*
 ** Custom Scrolling Hook
 */
function useScrollingListener() {
  const [scrollState, setScrollState] = useState({
    lastYPosition: 0,
    passedBreakpoint: false,
  })

  useEffect(() => {
    function handleScroll(e) {
      let newYPosition = window.scrollY

      // Did we pass the breakpoint?
      let passedBreakpoint = newYPosition > 50

      // Update State
      window.requestAnimationFrame(() => {
        setScrollState({
          lastYPosition: newYPosition,
          passedBreakpoint,
        })
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  return scrollState
}

const Header = ({ firebase }) => {
  // Initial State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  let { passedBreakpoint } = useScrollingListener()

  const {
    contentfulMenu: { routes },
  } = useStaticQuery(graphql`
    query getMainNavigation {
      contentfulMenu(slug: { eq: "main-navigation" }) {
        routes {
          slug
          title
        }
      }
    }
  `)

  return (
    <>
      <StyledHeader className={`${passedBreakpoint ? "scrolling" : ""}`}>
        <ContentContainer>
          <Link to="/" style={{ lineHeight: 0 }}>
            <Logo className="logo" />
          </Link>
          <Navigation routes={routes} />
          <button
            className="menu-trigger"
            onClick={() => setMobileMenuOpen(true)}
            onKeyDown={() => setMobileMenuOpen(true)}
          >
            <Menu />
          </button>
        </ContentContainer>
      </StyledHeader>
      <MobileMenu
        routes={routes}
        open={mobileMenuOpen}
        closeMenu={() => setMobileMenuOpen(false)}
      />
    </>
  )
}

export default withFirebase(Header)
