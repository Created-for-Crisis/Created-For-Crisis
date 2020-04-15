import React from "react"
import { graphql } from "gatsby"
import PropTypes from "prop-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { ArticleContainer } from "../styles/components"
import Banner from "../components/blocks/banner"

const Page = ({
  data: {
    contentfulPage: { title, content, banner },
  },
}) => (
  <Layout>
    <SEO title={title} />
    {banner && <Banner {...banner} />}
    <ArticleContainer>
      {!banner && <h1 style={{ margin: "4rem 0" }}>{title}</h1>}
      {content && documentToReactComponents(content.json)}
    </ArticleContainer>
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
      content {
        json
      }
      banner {
        actions {
          text
          variant
          link
          icon
          id
        }
        illustration {
          file {
            url
          }
        }
        content {
          json
        }
      }
      # blocks {
      # ... on ContentfulBanner {
      #   id
      #   actions {
      #     icon
      #     id
      #     link
      #     text
      #     variant
      #   }
      #   illustration {
      #     file {
      #       url
      #     }
      #   }
      #   content {
      #     json
      #   }
      # }
      # ... on ContentfulImageBlock {
      #   id
      #   title
      #   content {
      #     json
      #   }
      #   alignment
      #   image {
      #     file {
      #       url
      #     }
      #   }
      # }
      # ... on ContentfulTeamMemberGrid {
      #   id
      #   title
      #   snippet
      #   format
      #   members {
      #     id
      #     name
      #     role
      #     bio {
      #       json
      #     }
      #     gitHubUrl
      #     linkedInUrl
      #     website
      #     image {
      #       description
      #       fluid {
      #         src
      #       }
      #     }
      #   }
      # }
      # ... on ContentfulPattern {
      #   id
      #   name
      #   actions {
      #     id
      #     icon
      #     text
      #     variant
      #     link
      #   }
      #   description {
      #     json
      #   }
      # }
      # }
    }
  }
`
