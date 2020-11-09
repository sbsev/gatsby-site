const queries = require(`./src/utils/algolia`)

require(`dotenv`).config()

const remarkPlugins = [
  {
    resolve: `gatsby-remark-images-contentful`,
    options: {
      maxWidth: 1200,
      linkImagesToOriginal: false,
      withWebp: true,
    },
  },
  {
    resolve: `gatsby-remark-embed-video`,
    options: {
      urlOverrides: [
        {
          id: `youtube`,
          embedURL: videoId => `https://www.youtube-nocookie.com/embed/${videoId}`,
        },
      ],
    },
  },
  `gatsby-remark-responsive-iframe`,
  `gatsby-remark-smartypants`,
  `gatsby-remark-autolink-headers`,
  `gatsby-remark-attr`,
  `gatsby-remark-emoji`,
]

const siteMetadata = {
  title: `Studenten bilden Schüler`,
  description: `German student-run non-profit providing free tutoring to improve educational equity`,
  author: `Janosh Riebesell`,
  url: `https://studenten-bilden-schueler.de`,
}

const plugins = [
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
      plugins: remarkPlugins,
    },
  },
  `gatsby-plugin-catch-links`,
  `gatsby-plugin-styled-components`,
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
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: siteMetadata.author,
      short_name: siteMetadata.title,
      display: `standalone`,
      icon: `src/assets/favicon.svg`,
      background_color: `#150956`,
      theme_color: `#150956`,
    },
  },
  `gatsby-plugin-netlify`,
  `gatsby-plugin-netlify-cache`,
]

module.exports = { siteMetadata, plugins }
