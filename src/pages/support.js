import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout/Layout"
import SEO from "../components/Layout/SEO"
import { Splash } from "../components/Splash"
import { SplitContainer } from "../components/Container"
import { ContentBuilder } from "../components/ContentBuilder"
import { RelatedPages } from "../components/Layout/RelatedPages"
import { DonateForm } from "../components/Donation/DonateForm"

/*
 ** This page is also compiled manually
 ** so we can add the Donation Form within the content.
 */

const Support = () => {
  const {
    contentfulPage: {
      title,
      subtitle,
      splashActions,
      content,
      relatedPagesMenu,
    },
  } = useStaticQuery(graphql`
    query getSupportPage {
      contentfulPage(slug: { eq: "support" }) {
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
  `)
  return (
    <Layout>
      <SEO title={title} />
      {/* Page Components */}
      <Splash title={title} subtitle={subtitle} actions={splashActions} />
      <SplitContainer size="content" padded style={{ margin: "4rem auto" }}>
        <aside>
          <RelatedPages routes={relatedPagesMenu && relatedPagesMenu.routes} />
        </aside>
        <article>
          <DonateForm />
          <ContentBuilder content={content} />
        </article>
      </SplitContainer>
    </Layout>
  )
}

export default Support
