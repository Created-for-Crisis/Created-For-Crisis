import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import Layout from "../components/Layout/Layout"
import SEO from "../components/Layout/SEO"
import { Splash } from "../components/Splash"
import { Container } from "../components/Container"
import { Card, CardGrid } from "../components/Card"

const News = () => {
  const {
    allContentfulNews: { edges: news },
  } = useStaticQuery(graphql`
    query getNewsPage {
      allContentfulNews(sort: { fields: publishedDate, order: DESC }) {
        edges {
          node {
            id
            title
            publishedDate(formatString: "MMMM Do, YYYY")
            sourceName
            url
          }
        }
      }
    }
  `)

  // console.log({ news })
  return (
    <Layout>
      <SEO title={"News | Created for Crisis"} />
      {/* Page Components */}
      <Splash title={"News"} subtitle={null} actions={null} />
      {/* News */}
      <Container size="content" padded style={{ margin: "4rem auto" }}>
        <h3>Recent News</h3>
        <CardGrid columns={2}>
          {news.map(
            ({ node: { id, title, sourceName, publishedDate, url } }) => (
              <Card
                key={id}
                title={title}
                image={null}
                source={sourceName}
                date={publishedDate}
                as={OutboundLink}
                href={url}
                target="_blank"
                style={{ textDecoration: "none" }}
              />
            )
          )}
        </CardGrid>
      </Container>
    </Layout>
  )
}

export default News
