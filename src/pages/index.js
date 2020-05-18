import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { OutboundLink } from "gatsby-plugin-google-analytics"
import styled from "styled-components"
import { up } from "styled-breakpoints"
import Img from "gatsby-image"
import Layout from "../components/Layout/Layout"
import SEO from "../components/Layout/SEO"
import { Splash } from "../components/Splash"
import { Container } from "../components/Container"
import { ContentBuilder } from "../components/ContentBuilder"
import { Card, NewsGrid } from "../components/Card"
import { Header } from "../components/Header"
import config from "../../config"

const Introduction = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  ${up("lg")} {
    flex-direction: row;
    .content {
      margin-right: 1rem;
    }
  }
`

const IntroImg = styled(Img)`
  display: none;
  ${up("lg")} {
    display: block;
    margin: 0 0 0 1rem;
    border-radius: 0.5rem;
    flex: 1 0 490px;
  }
`

const Home = () => {
  const {
    contentfulPage: { title, headerTitle, subtitle, splashActions, content },
    allContentfulNews: { edges: news },
    contentfulAsset,
  } = useStaticQuery(graphql`
    query getHomePage {
      contentfulPage(slug: { eq: "home" }) {
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
      contentfulAsset(title: { eq: "Home Introduction Image" }) {
        id
        title
        fluid(maxWidth: 490, quality: 100, resizingBehavior: SCALE) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  `)

  console.log({ contentfulAsset })

  return (
    <Layout>
      <SEO
        title={`${title} | ${config.title}`}
        pathname={"/"}
        desc={config.description}
      />
      {/* Page Components */}
      <Splash
        title={headerTitle || title}
        subtitle={subtitle}
        actions={splashActions}
      />
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
            <IntroImg fluid={contentfulAsset.fluid} />
          </Introduction>
        </div>
      </Container.Page>
    </Layout>
  )
}

export default Home
