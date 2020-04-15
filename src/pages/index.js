import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageBuilder from "../components/blocks/pageBuilder"
import Banner from "../components/blocks/banner"

const Home = () => {
  const {
    contentfulPage: { title, content, banner, blocks },
  } = useStaticQuery(graphql`
    query getHomePage {
      contentfulPage(id: { eq: "b8d22ea9-975f-5a51-8d54-ac1899205374" }) {
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
        #   ... on ContentfulBanner {
        #     id
        #     actions {
        #       icon
        #       id
        #       link
        #       text
        #       variant
        #     }
        #     illustration {
        #       file {
        #         url
        #       }
        #     }
        #     content {
        #       json
        #     }
        #   }
        #   ... on ContentfulImageBlock {
        #     id
        #     title
        #     content {
        #       json
        #     }
        #     alignment
        #     image {
        #       file {
        #         url
        #       }
        #     }
        #   }
        # }
      }
    }
  `)
  return (
    <Layout>
      <SEO title={title} />
      <Banner {...banner} />
      {PageBuilder(blocks, content)}
    </Layout>
  )
}

export default Home
