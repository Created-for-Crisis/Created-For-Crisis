import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const StyledRelatedPages = styled.nav`
  background-color: ${props => props.theme.colors.shades.muteGrey};
  border-radius: 0.5rem;
  overflow: hidden;
  h3 {
    padding: 1.5rem;
    margin: 0;
  }
  a {
    display: block;
    padding: 0.65rem 1.5rem 0.65rem 3rem;
    font-size: 1.1rem;
    color: ${props => props.theme.colors.shades.textMedium};
    text-decoration: none;
    will-change: color background-color;
    transition: all 0.15s ease;
    &:hover,
    &:focus,
    &:active,
    &.active {
      background-color: ${props => props.theme.colors.shades.plainGrey};
      color: ${props => props.theme.colors.shades.textLight};
    }

    &.active {
      font-weight: 600;
    }
  }
`

export const RelatedPages = ({ routes }) => {
  return (
    <StyledRelatedPages>
      <h3>Related Pages</h3>
      {routes.map(({ id, title, slug, contentfulparent }) => {
        let path
        // If the page has a parent page include that in the path
        // Maximum depth of 2
        if (contentfulparent && contentfulparent.contentfulparent) {
          path = `/${contentfulparent.contentfulparent.slug}/${contentfulparent.slug}/${slug}/`
        } else if (contentfulparent) {
          path = `/${contentfulparent.slug}/${slug}/`
        } else {
          path = `/${slug}/`
        }

        return (
          <Link key={id} to={path} activeClassName="active">
            {title}
          </Link>
        )
      })}
    </StyledRelatedPages>
  )
}
