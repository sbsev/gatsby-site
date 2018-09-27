require('dotenv').config()

const pageQuery = `{
  pages: allContentfulPage {
    edges {
      node {
        objectID:id
        slug
        title {
          title
        }
        body {
          childMarkdownRemark {
            excerpt
            headings {
              value
              depth
            }
          }
        }
      }
    }
  }
}`

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(({ node }) => node),
  },
]

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
        spaceId: `gi9muc70s4ub`,
        accessToken: `72d19ad7e53acc3342cf4d697f686a178da039646724412fa160d6f02c8728b4`,
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
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-121212963-1`,
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
        apiKey: process.env.algoliaApiKey,
        indexName: process.env.algoliaIndexName,
        queries,
        chunkSize: 10000, // default: 1000
      },
    },
  ],
}
