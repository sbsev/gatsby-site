
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
          data: childMarkdownRemark {
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
    indexName: `Pages`,
  },
]

module.exports = queries