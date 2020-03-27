import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Mail, X } from "react-feather"
import Button from "./button"
import DiscordLogo from "../assets/logos/Discord-Logo-White.svg"

const StyledMobileMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 100;
  visibility: hidden;

  .overlay,
  .panel {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    transition: all 0.25s ease-in-out;
  }

  .overlay {
    opacity: 0;
    z-index: 99;
    width: 100vw;
    background-color: ${props => props.theme.colors.mediumGrey};
    border: none;
  }

  .panel {
    z-index: 100;
    width: 240px;
    background-color: ${props => props.theme.colors.white};
    transform: translateX(100%);
  }

  .close {
    cursor: pointer;
    background: ${props => props.theme.colors.white};
    border: none;
    box-shadow: none;
  }

  &.visible {
    visibility: visible;
    .overlay {
      opacity: 1;
    }
    .panel {
      transform: translateX(0);
    }
  }

  header {
    padding: 1rem;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: ${props => props.theme.fonts.header};
    font-weight: 700;
  }

  nav {
    display: flex;
    flex-direction: column;
  }

  nav a:not(.button) {
    position: relative;
    margin: 0.5rem 1rem;
    padding: 1rem 0;
    font-family: ${props => props.theme.fonts.header};
    color: ${props => props.theme.colors.mediumGrey};
    text-decoration: none;
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

  ${Button} {
    margin: 1rem 1rem 0 1rem;
  }
`

const MobileMenu = ({ open, closeMenu, links }) => (
  <StyledMobileMenu className={`${open ? "visible" : ""}`}>
    <button className="overlay" onClick={closeMenu} onKeyDown={closeMenu} />
    <div className="panel">
      <header>
        Menu
        <button className="close" onClick={closeMenu} onKeyDown={closeMenu}>
          <X />
        </button>
      </header>
      <nav>
        <Link to={"/"} activeClassName="active">
          Home
        </Link>
        {links.map(({ text, route }, i) => (
          <Link key={i} to={route} activeClassName="active">
            {text}
          </Link>
        ))}
        <Button
          variant="primary"
          as="a"
          href="mailto:info@createdforcrisis.org"
          target="_blank"
          className="button"
        >
          Contact Us
          <Mail />
        </Button>
        <Button
          variant="discord"
          as="a"
          href="https://discord.gg/T2Xw2j7"
          target="_blank"
          className="button"
        >
          Get Involved
          <DiscordLogo />
        </Button>
      </nav>
    </div>
  </StyledMobileMenu>
)

export default MobileMenu
