const queries = require('./src/utils/algolia')

require('dotenv').config()

console.log('process.env :', process.env)

module.exports = {
  siteMetadata: {
    title: `Studenten bilden Schüler`,
    description: `German student-run nonprofit initiative`,
    author: `Janosh Riebesell`,
    siteUrl: `https://studenten-bilden-schueler.de`,
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.contentfulSpaceId,
        accessToken: process.env.contentfulAccessToken,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 2500,
              linkImagesToOriginal: false,
              wrapperStyle: `max-width: none !important;`,
            },
          },
          `gatsby-remark-embed-video`,
          `gatsby-remark-responsive-iframe`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GATrackingId,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.algoliaAppId,
        apiKey: process.env.algoliaAdminKey,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: './src/assets/favicon.png',
      },
    },
    `gatsby-plugin-netlify`,
  ],
}
