import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import styled from "styled-components"
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import SEO from "../components/Layout/SEO"
import Layout from "../components/Layout/Layout"
import { Splash } from "../components/Splash"
import { Container } from "../components/Container"
import { RelatedPages } from "../components/Layout/RelatedPages"

const PageContainer = styled(Container)`
  margin: 5rem auto;
  display: flex;
  align-items: flex-start;

  aside {
    position: sticky;
    top: 8rem;
    left: 0;
    flex: 0 0 320px;
  }

  article {
    flex: 1;
    margin-left: 2.5rem;
  }
`
// Leaving these in as samples for now.
const Bold = ({ children }) => <span className="bold">{children}</span>
const Text = ({ children }) => <p className="align-center">{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
  },
}

const Page = ({
  data: {
    contentfulPage: {
      title,
      subtitle,
      splashActions,
      content,
      relatedPagesMenu,
    },
  },
}) => {
  return (
    <Layout>
      <SEO title={title} />
      {/* Page Components */}
      <Splash title={title} subtitle={subtitle} actions={splashActions} />
      <PageContainer size="content">
        <aside>
          <RelatedPages routes={relatedPagesMenu && relatedPagesMenu.routes} />
        </aside>
        <article>
          {content && documentToReactComponents(content.json, options)}
        </article>
      </PageContainer>
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default Page

export const postQuery = graphql`
  query($id: String!) {
    contentfulPage(id: { eq: $id }) {
      title
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
          }
        }
      }
    }
  }
`
