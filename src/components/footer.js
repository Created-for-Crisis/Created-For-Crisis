import React from "react"
import PropTypes from "prop-types"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { ContentContainer } from "../styles/components"
import { Code, Heart } from "react-feather"

const StyledFooter = styled.section`
  padding: 2rem 1rem;
  text-align: center;
  p.copyright {
    margin-bottom: 0.5rem;
  }
  a.credit {
    margin: 0;
    font-family: ${props => props.theme.fonts.header};
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: ${props => props.theme.colors.mediumGrey};
    transition: all 0.1s ease-in;
    span {
      margin: 0 0.25rem;
    }
    svg {
      height: 1.25rem;
      &.code {
        stroke: ${props => props.theme.colors.tertiary};
      }
      &.heart {
        fill: ${props => props.theme.colors.primary};
        stroke: ${props => props.theme.colors.primary};
      }
    }
    &:hover {
      opacity: 0.8;
    }
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
    a:not(.button) {
      position: relative;
      margin: 0.5rem;
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
`

const Footer = () => {
  const {
    contentfulMenu: { routes },
  } = useStaticQuery(graphql`
    query getFooterNavigation {
      contentfulMenu(slug: { eq: "footer-navigation" }) {
        routes {
          slug
          title
        }
      }
    }
  `)
  return (
    <StyledFooter>
      <ContentContainer>
        <nav>
          {routes &&
            routes.map(({ title, slug }, i) => (
              <Link key={i} to={`/${slug}/`} activeClassName="active">
                {title}
              </Link>
            ))}
        </nav>
        <p className="copyright">
          © {new Date().getFullYear()} Created for Crisis
        </p>
        <a
          className="credit"
          href="http://ryanmckenna.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Code className="code" />
          <span>+</span>
          <Heart className="heart" />
        </a>
      </ContentContainer>
    </StyledFooter>
  )
}

Footer.propTypes = {
  inverted: PropTypes.bool,
}

Footer.defaultProps = {
  inverted: false,
}

export default Footer
