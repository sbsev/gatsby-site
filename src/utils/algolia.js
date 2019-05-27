const pageQuery = `{
  pages: allContentfulPage {
    edges {
      node {
        objectID: id
        slug
        title
        body {
          remark: childMarkdownRemark {
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
        title
        date(formatString: "D. MMM YYYY", locale: "de")
        author {
          name
          email
          homepage
        }
        tags {
          title
          slug
        }
        body {
          remark: childMarkdownRemark {
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
    indexName: `Pages`,
    query: pageQuery,
    transformer: ({ data }) =>
      data.pages.edges.map(({ node: { body, ...rest } }) =>
        [`Fehler 404`].includes(rest.title)
          ? {}
          : {
            ...body.remark,
            ...rest,
          }
      ),
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
  {
    indexName: `Posts`,
    query: postQuery,
    transformer: ({ data }) =>
      data.posts.edges.map(({ node: { body, ...rest } }) => ({
        ...body.remark,
        ...rest,
      })),
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries
