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

const articleQuery = `{
  articles: allContentfulWikiArticle {
    edges {
      node {
        objectID: id
        slug
        title
        section {
          title
          slug
        }
        subsection {
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
    indexName: `Pages`,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
  {
    query: postQuery,
    transformer: ({ data }) =>
      data.posts.edges.map(({ node: { body, ...rest } }) => ({
        ...body.remark,
        ...rest,
      })),
    indexName: `Posts`,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
  {
    query: articleQuery,
    transformer: ({ data }) =>
      data.articles.edges.map(({ node: { body, ...rest } }) => ({
        ...body.remark,
        ...rest,
      })),
    indexName: `Articles`,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries
