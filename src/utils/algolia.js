const pageQuery = `{
  pages: allContentfulPage {
    edges {
      node {
        objectID: id
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
        objectID: id
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
        ({ node: { title, body, ...rest } }) =>
          [`Fehler 404`].includes(title.title)
            ? {}
            : {
                ...title,
                ...body.data,
                ...rest,
              }
      ),
    indexName: `Pages`,
  },
  {
    query: postQuery,
    transformer: ({ data }) =>
      data.posts.edges.map(({ node: { title, body, ...rest } }) => ({
        ...title,
        ...body.data,
        ...rest,
      })),
    indexName: `Posts`,
  },
]

module.exports = queries
