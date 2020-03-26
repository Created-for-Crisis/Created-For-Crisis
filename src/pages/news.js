import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { ContentContainer } from "../styles/components"

const News = () => {
  const {
    allContentfulArticle: { edges: articles },
  } = useStaticQuery(graphql`
    query getNews {
      allContentfulArticle {
        edges {
          node {
            id
            title
            slug
          }
        }
      }
    }
  `)

  console.log({ articles })
  return (
    <Layout>
      <SEO title="News" />
      <ContentContainer>
        <h1>News</h1>
        <ul>
          {articles.map(({ node: { id, title, slug } }) => (
            <li key={id}>
              <Link to={`/news/${slug}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </ContentContainer>
    </Layout>
  )
}

export default News
