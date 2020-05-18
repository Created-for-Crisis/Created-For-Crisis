import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import SEO from "../components/Layout/SEO"
import { Splash } from "../components/Splash"
import { Container } from "../components/Container"
import { ContentBuilder } from "../components/ContentBuilder"
import { RelatedPages } from "../components/Layout/RelatedPages"
import { DonateForm } from "../components/Donation/DonateForm"
import config from "../../config"

/*
 ** This page is also compiled manually
 ** so we can add the Donation Form within the content.
 */

const Support = ({ location: { pathname } }) => {
  const {
    contentfulPage: {
      title,
      headerTitle,
      subtitle,
      splashActions,
      content,
      relatedPagesMenu,
    },
  } = useStaticQuery(graphql`
    query getSupportPage {
      contentfulPage(slug: { eq: "donate" }) {
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
            }
          }
        }
      }
    }
  `)
  return (
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
          <RelatedPages routes={relatedPagesMenu && relatedPagesMenu.routes} />
        </aside>
        <article>
          <DonateForm />
          <ContentBuilder content={content} />
        </article>
      </Container.Page>
    </Layout>
  )
}

export default Support
