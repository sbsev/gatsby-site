const path = require(`path`)
const glob = require(`glob`)
const lodash = require(`lodash`)

const templates = glob.sync(`./src/templates/*.js`, {
  absolute: true,
})

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

const pageSets = templates.map(template => {
  const type = path.basename(template, `.js`)
  return {
    query: contentfulQuery(lodash.upperFirst(type)),
    component: template,
  }
})

const pagePath = node => {
  if (node.internal.type === `ContentfulPost`) return `/blog/` + node.slug
  return node.slug
}

exports.createPages = async ({ graphql, actions }) => {
  await Promise.all(
    pageSets.map(async ({ query, component }) => {
      const response = await graphql(query)
      if (response.errors) throw new Error(response.errors)
      response.data.content.edges.forEach(edge => {
        // exclude pages defined in src/pages
        const { slug } = edge.node
        if (![`/`, `standorte`, `anmeldung`].includes(slug)) {
          actions.createPage({
            path: pagePath(edge.node),
            component,
            context: { slug },
          })
        }
      })
    })
  )
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
