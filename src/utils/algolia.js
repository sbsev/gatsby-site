const queryTemplate = (type, fields = ``, filter = ``) => `{
  items: allContentful${type}${filter} {
    nodes {
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
      ${fields}
    }
  }
}`

const postFields = `
  date(formatString: "D. MMM YYYY", locale: "de")
  author {
    name
    email
    homepage
  }
  tags {
    title
  }
`

const flatten = arr => arr.map(({ body, ...rest }) => ({ ...body.remark, ...rest }))

const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    indexName: `Pages`,
    query: queryTemplate(`Page`, ``, `(filter: {slug: {nin: "/404"}})`),
    transformer: ({ data }) => flatten(data.items.nodes),
    settings,
  },
  {
    indexName: `Posts`,
    query: queryTemplate(`Post`, postFields),
    transformer: ({ data }) => flatten(data.items.nodes),
    settings,
  },
]

module.exports = queries
