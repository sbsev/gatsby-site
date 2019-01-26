const path = require(`path`)
const glob = require(`glob`)
const lodash = require(`lodash`)

const templates = glob.sync(`./src/templates/*.js`, {
  absolute: true,
})

const fragments = {
  wikiArticle: `
    section { slug }
    subsection { slug }
  `,
  wikiSubsection: `
    section { slug }
  `,
}

const contentfulQuery = (contentType, fragment = ``) => `
  {
    content: allContentful${contentType} {
      edges {
        node {
          internal {
            type
          }
          slug
          ${fragment}
        }
      }
    }
  }
`

const pageSets = templates.map(template => {
  const type = path.basename(template, `.js`)
  return {
    query: contentfulQuery(lodash.upperFirst(type), fragments[type]),
    component: template,
  }
})

const pagePath = node => {
  switch (node.internal.type) {
    case `ContentfulPost`:
      return `/blog/` + node.slug
    case `ContentfulWikiSection`:
      return `wiki/${node.slug}`
    case `ContentfulWikiSubsection`:
      return `wiki/${node.section.slug}/${node.slug}`
    case `ContentfulWikiArticle`:
      if (!node.subsection) return `wiki/${node.section.slug}/${node.slug}`
      return `wiki/${node.section.slug}/${node.subsection.slug}/${node.slug}`
    default:
      return node.slug
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions

  createRedirect({
    fromPath: `/index.php/*`,
    toPath: `/:splat`,
    isPermanent: true,
  })

  pageSets.forEach(async ({ query, component }) => {
    const response = await graphql(query)
    if (response.errors) throw new Error(response.errors)
    response.data.content.edges.forEach(({ node }) => {
      // exclude pages defined in src/pages
      if (![`standorte`, `404`].includes(node.slug)) {
        createPage({
          path: pagePath(node),
          component,
          context: {
            slug: node.slug,
          },
        })
      }
    })
  })
}
