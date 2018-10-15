const pageQuery = `{
  pages: allContentfulPage {
    edges {
      node {
        id
        slug
        title {
          title
        }
        body {
          data: childMarkdownRemark {
            excerpt(pruneLength: 5000)
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

const postQuery = `{
  posts: allContentfulPost {
    edges {
      node {
        id
        slug
        title {
          title
        }
        date(formatString: "D. MMMM YYYY", locale: "de")
        author {
          name
          email
          homepage
        }
        categories {
          title
          slug
        }
        body {
          data: childMarkdownRemark {
            excerpt(pruneLength: 5000)
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
    transformer: ({ data }) =>
      data.pages.edges.map(
        ({ node }) =>
          [`Fehler 404`].includes(node.title.title)
            ? {}
            : {
        title: node.title.title,
        slug: node.slug,
        ...node.body.data,
        objectID: node.id,
      })),
    indexName: `Pages`,
  },
  {
    query: postQuery,
    transformer: ({ data }) =>
      data.posts.edges.map(({ node }) => ({
        title: node.title.title,
        slug: node.slug,
        date: node.date,
        author: node.author,
        categories: node.categories,
        ...node.body.data,
        objectID: node.id,
      })),
    indexName: `Posts`,
  },
]

module.exports = queries
