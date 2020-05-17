import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import Layout from "../components/Layout/Layout"
import SEO from "../components/Layout/SEO"
import { Splash } from "../components/Splash"
import { Container } from "../components/Container"
import { Header } from "../components/Header"
import { Card, NewsGrid } from "../components/Card"
import config from "../../config"

const News = ({ location: { pathname } }) => {
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
            image {
              title
              fluid(
                quality: 100
                maxHeight: 60
                maxWidth: 60
                cropFocus: CENTER
                resizingBehavior: THUMB
              ) {
                ...GatsbyContentfulFluid_withWebp
              }
            }
          }
        }
      }
    }
  `)

  // console.log({ news })
  return (
    <Layout>
      <SEO
        title={`Support | ${config.title}`}
        pathname={pathname}
        desc={config.description}
      />
      {/* Page Components */}
      <Splash title={"News"} subtitle={null} actions={null} />
      {/* News */}
      <Container.Page size="content" padded>
        <div>
          <Header as="h3">Recent News</Header>
          <NewsGrid>
            {news.map(
              ({
                node: { id, title, sourceName, publishedDate, url, image },
              }) => (
                <Card
                  key={id}
                  title={title}
                  image={image}
                  source={sourceName}
                  date={publishedDate}
                  as={OutboundLink}
                  href={url}
                  target="_blank"
                  style={{ textDecoration: "none" }}
                />
              )
            )}
          </NewsGrid>
        </div>
      </Container.Page>
    </Layout>
  )
}

export default News
