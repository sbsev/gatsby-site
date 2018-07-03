const config = require('./config')
const {
  contentful: { spaceId, accessToken },
  googleAnalytics: { trackingId }
} = config

if (!spaceId || !accessToken) {
  throw new Error(
    `Contentful spaceId and at least the delivery token need to be provided.`
  )
}
if (!trackingId) {
  throw new Error(
    `Google Analytics trackingId needs to be provided.`
  )
}

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
      options: config.contentful,
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-contentful`,
            options: {
              // maxWidth (in pixels) of content container
              // used as base for generating different widths of each image
              maxWidth: 880,
              showCaptions: true,
              backgroundColor: `none`,
            },
          },
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: config.googleAnalytics,
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: "./src/assets/favicon.png",
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: false,
          yandex: false,
          windows: false
        }
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
