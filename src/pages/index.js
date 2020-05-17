import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import styled from "styled-components"
import { up } from "styled-breakpoints"
import Layout from "../components/Layout/Layout"
import SEO from "../components/Layout/SEO"
import { Splash } from "../components/Splash"
import { Container } from "../components/Container"
import { ContentBuilder } from "../components/ContentBuilder"
import { Card, NewsGrid } from "../components/Card"
import { Header } from "../components/Header"

const Introduction = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  img {
    display: none;
  }

  ${up("lg")} {
    flex-direction: row;
    .content {
      margin-right: 1rem;
    }

    img {
      display: block;
      margin: 0 0 0 1rem;
      border-radius: 0.5rem;
    }
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
      contentfulAsset(id: { eq: "61e8eb76-9273-5776-9142-8847f7db0191" }) {
        id
        title
        fluid(maxWidth: 490, quality: 100, resizingBehavior: SCALE) {
          src
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title={title} />
      {/* Page Components */}
      <Splash title={title} subtitle={subtitle} actions={splashActions} />
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
      {/* Introduction */}
      <Container.Page size="content" padded>
        <div>
          <Header as="h3">Introduction</Header>
          <Introduction>
            <div className="content">
              <ContentBuilder content={content} />
            </div>
            <img src={src} alt={imageTitle} />
          </Introduction>
        </div>
      </Container.Page>
    </Layout>
  )
}

export default Home
