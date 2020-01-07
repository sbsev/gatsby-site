const queryTemplate = (type, fields = ``) => `{
  items: allContentful${type} {
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
        ${fields}
      }
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
    slug
  }
`

const flatten = arr =>
  arr.map(({ node: { body, slug, ...rest } }) => ({
    ...body.remark,
    slug: (`/` + slug).replace(`//`, `/`),
    ...rest,
  }))
const settings = { attributesToSnippet: [`excerpt:20`] }

const queries = [
  {
    indexName: `Pages`,
    query: queryTemplate(`Page`),
    transformer: ({ data }) =>
      flatten(
        data.items.edges.filter(page => ![`Fehler 404`].includes(page.node.title))
      ),
    settings,
  },
  {
    indexName: `Posts`,
    query: queryTemplate(`Post`, postFields),
    transformer: ({ data }) => flatten(data.items.edges),
    settings,
  },
]

module.exports = queries
