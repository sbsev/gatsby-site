const config = require('./config')
const {
  contentful: { spaceId, accessToken },
  googleAnalytics: { trackingId }
} = config

if (!spaceId || !accessToken) {
  throw new Error(
    'Contentful spaceId and at least the delivery token need to be provided.'
  )
}
if (!trackingId) {
  throw new Error(
    'Google Analytics trackingId needs to be provided.'
  )
}

module.exports = {
  siteMetadata: {
    title: `Studenten bilden Schüler`,
    description: `Homepage of the German student-run
      nonprofit initiative Studenten bilden Schüler e.V.`,
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
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 720,
              linkImagesToOriginal: false,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1rem`,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: config.googleAnalytics,
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
