import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { Container } from "../Container"
import { Button } from "../Button"
// import colorLogo from "../../assets/logos/color-logo.png"
import Logo from "../../assets/logos/colored-logo.svg"

const StyledMasthead = styled.div`
  display: flex;
  align-items: center;
  height: 72px;
  background-color: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.shades.white};
`

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  a:not(.button) {
    text-decoration: none;
    color: ${props => props.theme.colors.shades.white};
    font-weight: 500;
    font-family: ${props => props.theme.fonts.body};
  }

  a + a {
    margin-left: 3rem;
  }
`

export const Masthead = ({ user, routes }) => (
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
        <Logo style={{ height: "40px" }} />
      </Link>
      <Nav>
        {routes &&
          routes.map(({ title, slug }, i) => (
            <Link key={i} to={`/${slug}/`} activeClassName="active">
              {title}
            </Link>
          ))}
        {/* If Logged in User show My Account button */}
        {user ? (
          <Button
            color="gold"
            as={Link}
            to={"/account/"}
            style={{ width: "142px", padding: 0 }}
          >
            My Account
          </Button>
        ) : (
          <Button
            color="green"
            as={Link}
            to={"/donate/"}
            style={{ width: "142px", padding: 0 }}
          >
            Donate
          </Button>
        )}
      </Nav>
    </Container>
  </StyledMasthead>
)

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
