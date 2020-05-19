import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import SEO from "../components/Layout/SEO"
import Layout from "../components/Layout/Layout"
import { Splash } from "../components/Splash"
import { Container } from "../components/Container"
import { ContentBuilder } from "../components/ContentBuilder"
import { RelatedPages } from "../components/Layout/RelatedPages"
import config from "../../config"

const Page = ({
  location: { pathname },
  data: {
    contentfulPage: {
      title,
      headerTitle,
      subtitle,
      splashActions,
      content,
      relatedPagesMenu,
    },
  },
}) => (
  <Layout>
    <SEO
      title={`${title} | ${config.title}`}
      pathname={pathname}
      desc={subtitle || config.description}
    />
    {/* Page Components */}
    <Splash
      title={headerTitle || title}
      subtitle={subtitle}
      actions={splashActions}
    />
    <Container.Page size="content" padded>
      <aside>
        <RelatedPages
          routes={relatedPagesMenu ? relatedPagesMenu.routes : []}
        />
      </aside>
      <article>
        <ContentBuilder content={content} />
      </article>
    </Container.Page>
  </Layout>
)

Page.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default Page

export const postQuery = graphql`
  query($id: String!) {
    contentfulPage(id: { eq: $id }) {
      title
      headerTitle
      subtitle
      splashActions {
        text
        color
        icon
        iconPosition
        id
        url
        external
      }
      content {
        json
      }
      relatedPagesMenu {
        routes {
          id
          title
          slug
          contentfulparent {
            slug
            contentfulparent {
              slug
            }
          }
        }
      }
    }
  }
`
