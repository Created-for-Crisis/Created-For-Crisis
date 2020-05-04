import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import styled from "styled-components"
import Layout from "../components/Layout/Layout"
import SEO from "../components/Layout/SEO"
import { Splash } from "../components/Splash"
import { Container } from "../components/Container"
import { ContentBuilder } from "../components/ContentBuilder"
import { Card, CardGrid } from "../components/Card"

const Introduction = styled.div`
  display: flex;
  align-items: flex-start;
  .content {
    margin-right: 1rem;
  }
  img {
    margin-left: 1rem;
    border-radius: 0.5rem;
  }
`

const Home = () => {
  const {
    contentfulPage: { title, subtitle, splashActions, content },
    allContentfulNews: { edges: news },
    contentfulAsset: {
      title: imageTitle,
      fluid: { src },
    },
  } = useStaticQuery(graphql`
    query getHomePage {
      contentfulPage(slug: { eq: "home" }) {
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
      }
      allContentfulNews(
        limit: 4
        sort: { fields: publishedDate, order: DESC }
      ) {
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
      contentfulAsset(id: { eq: "61e8eb76-9273-5776-9142-8847f7db0191" }) {
        id
        title
        fluid(maxWidth: 490, quality: 100, resizingBehavior: SCALE) {
          src
        }
      }
    }
  `)

  // console.log({ news })
  return (
    <Layout>
      <SEO title={title} />
      {/* Page Components */}
      <Splash title={title} subtitle={subtitle} actions={splashActions} />
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
      {/* Introduction */}
      <Container size="content" padded style={{ margin: "4rem auto" }}>
        <h3>Introduction</h3>
        <Introduction>
          <div className="content">
            <ContentBuilder content={content} />
          </div>
          <img src={src} alt={imageTitle} />
        </Introduction>
      </Container>
    </Layout>
  )
}

export default Home
