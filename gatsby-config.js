const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

const config = require("./config")

module.exports = {
  siteMetadata: {
    title: config.title,
    titleAlt: config.title,
    titleTemplate: config.titleTemplate,
    description: config.description,
    headline: config.description,
    author: config.author,
    siteUrl: config.siteUrl,
    banner: config.image,
    twitter: config.twitter,
    facebook: config.facebook,
    siteLanguage: config.siteLanguage, // Language Tag on <html> element
    ogLanguage: config.ogLanguage, // Facebook Language
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options:
        activeEnv === "development"
          ? {
              spaceId: process.env.CONTENTFUL_SPACE_ID_DEV,
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_DEV,
              environment: process.env.CONTENTFUL_ENVIRONMENT_DEV,
              downloadLocal: true,
            }
          : {
              spaceId: process.env.CONTENTFUL_SPACE_ID_PROD,
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_PROD,
              environment: process.env.CONTENTFUL_ENVIRONMENT_PROD,
              downloadLocal: true,
            },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
        ssr: true,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/styles/typography`,
        omitGoogleFont: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // replace "UA-XXXXXXXXX-X" with your own Tracking ID
        trackingId: "UA-161994008-1",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: config.title,
        short_name: config.shortName,
        description: config.description,
        start_url: `/`,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: `standalone`,
        icon: `src/assets/favicons/CfC-Favicon-64.png`, // This path is relative to the root of the site.
        icons: [
          {
            src: `/favicons/CfC-Favicon-192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/favicons/CfC-Favicon-512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets\/.*\.svg$/, // See below to configure properly
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-sitemap`,
  ],
}
