const path = require(`path`)

const pageTemplate = path.resolve(`./src/templates/page.js`)
const postTemplate = path.resolve(`./src/templates/post.js`)

const contentfulQuery = contentType => `
  {
    content: allContentful${contentType} {
      edges {
        node {
          internal {
            type
          }
          slug
        }
      }
    }
  }
`

const pageSets = [
  [contentfulQuery(`Page`), pageTemplate],
  [contentfulQuery(`Post`), postTemplate],
]

exports.createPages = async ({ graphql, actions }) => {
  await Promise.all(
    pageSets.map(async ([query, component]) => {
      const response = await graphql(query)
      if (response.errors) throw new Error(response.errors)
      response.data.content.edges.forEach(edge => {
        // exclude pages defined in src/pages
        const { slug } = edge.node
        if (![`/`, `/standorte`].includes(slug)) {
          actions.createPage({ path: slug, component, context: { slug } })
        }
      })
    })
  )
}

exports.onCreateNode = ({ node }) => {
  // Ensure all slugs start with a forward slash.
  if (node.slug && !node.slug.startsWith(`/`)) node.slug = `/` + node.slug
  // Prefix all post slugs with /blog.
  if (node.internal.type === `ContentfulPost`) node.slug = `/blog` + node.slug
  if (node.internal.type === `ContentfulChapter`)
    node.slug = `/standorte` + node.slug
}

// Enable absolute imports from `src`.
// See https://gatsbyjs.org/docs/add-custom-webpack-config#absolute-imports.
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, `src`), `node_modules`],
    },
  })
}
