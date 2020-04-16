import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import Banner from "../components/blocks/banner"
import { ArticleContainer } from "../styles/components"
import Donateform from "../components/Donation/DonateForm"

import { AuthUserContext } from "../components/Session"

const Donate = () => {
  const { contentfulBanner } = useStaticQuery(graphql`
    query getDonatePage {
      contentfulBanner(id: { eq: "144114a6-c600-58e1-b612-faa9e333d538" }) {
        title
        illustration {
          file {
            url
          }
        }
        actions {
          text
          variant
          link
          icon
          internal_link
        }
        content {
          json
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Donate" />
      <Banner {...contentfulBanner} />
      <ArticleContainer style={{ padding: 0 }}>
        <AuthUserContext.Consumer>
          {authUser => <Donateform authUser={authUser} />}
        </AuthUserContext.Consumer>
        <h3 style={{ marginTop: "0" }}>
          Created For Crisis no longer needs to look for ways to help; they come
          to us.
        </h3>
        <p>
          We already received requests for more designs, ranging from surgical
          caps to nasal swabs, and for assistance in other countries. But we
          need help. We can find the people, but rapid research and working with
          international health authorities require resources we currently lack.
        </p>
        <p>
          COVID-19 is changing the landscape of healthcare, breaking down
          barriers which kept innovators out. This is a new wave of crisis
          response, one which empowers people to help through accessible designs
          which can be rapidly deployed. Through funding and institutional
          support you can help Created for Crisis grow as a grassroots aid
          organization, a rapid response team with the diversity and reach of
          the internet which provides solutions at a pace with which traditional
          avenues cannot compete.
        </p>
      </ArticleContainer>
    </Layout>
  )
}

export default Donate
