const activeEnv =
  process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

require("dotenv").config({
  path: `.env.${activeEnv}`,
})

module.exports = {
  siteMetadata: {
    title: `Created for Crisis`,
    description: `We're a nationwide group of individuals who have come together in a time
    of crisis to solve important problems.`,
    author: `@rekenna`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
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
            }
          : {
              spaceId: process.env.CONTENTFUL_SPACE_ID_PROD,
              accessToken: process.env.CONTENTFUL_ACCESS_TOKEN_PROD,
              environment: process.env.CONTENTFUL_ENVIRONMENT_PROD,
            },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
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
        name: `created-for-crisis`,
        short_name: `cfc`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
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
  ],
}
