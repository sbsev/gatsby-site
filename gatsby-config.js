const queries = require(`./src/utils/algolia`)

require(`dotenv`).config()

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
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              maxWidth: 1200,
              linkImagesToOriginal: false,
              wrapperStyle: `
                border-radius: 0.5em;
                overflow: hidden;
              `,
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
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_ADMIN_KEY,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: `./src/assets/favicon.png`,
      },
    },
    `gatsby-plugin-netlify`,
  ],
}
