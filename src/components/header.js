import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled from "styled-components"
import { rgba } from "polished"
import { Mail } from "react-feather"
import { up } from "styled-breakpoints"
import Button from "./button"
import Logo from "../assets/Logo.svg"

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => props.theme.layout.headerHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  z-index: 100;
  transition: all 0.25s ease-in-out;
  background: ${props => rgba(props.theme.colors.white, 0.95)};
  box-shadow: 12px 30px 0px rgba(16, 16, 17, 0.0003),
    3.4px 8px 0px rgba(16, 16, 17, 0.0007), 1px 2px 0px rgba(16, 16, 17, 0.02);
  nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    a:not(.button) {
      font-size: 0.85rem;
      font-family: ${props => props.theme.fonts.header};
      color: ${props => props.theme.colors.mediumGrey};
      font-weight: 400;
      text-decoration: none;
      transition: all 0.25s ease-in-out;
      &:hover {
        color: ${props => props.theme.colors.tertiary};
      }
    }
  }
  &.scrolling {
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
  }

  ${up("md")} {
    padding: 1rem 2rem;
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

const Header = ({ inverted }) => {
  // Initial State
  let { passedBreakpoint } = useScrollingListener()

  return (
    <StyledHeader
      className={`${inverted && passedBreakpoint ? "scrolling" : ""}`}
    >
      <Link to="/" style={{ lineHeight: 0 }}>
        <Logo className="logo" />
      </Link>
      <nav>
        <Button
          variant="grey"
          as="a"
          href="mailto:info@createdforcrisis.org"
          target="_blank"
          className="button"
        >
          <Mail /> Contact
        </Button>
      </nav>
    </StyledHeader>
  )
}

Header.propTypes = {
  inverted: PropTypes.bool,
}

Header.defaultProps = {
  inverted: false,
}

export default Header
