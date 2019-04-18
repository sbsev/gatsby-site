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
      return `blog/` + node.slug
    case `ContentfulWikiSection`:
      return `wiki/${node.slug}`
    case `ContentfulWikiSubsection`:
      return `wiki/${node.section.slug}/${node.slug}`
    case `ContentfulWikiArticle`:
      if (!node.subsection) return `wiki/${node.section.slug}/${node.slug}`
      return `wiki/${node.section.slug}/${node.subsection.slug}/${node.slug}`
    default:
      if (node.slug === `404`) return `404.html`
      return node.slug
  }
}

exports.createPages = async ({ graphql, actions }) => {
  await pageSets.forEach(async ({ query, component }) => {
    const response = await graphql(query)
    if (response.errors) throw new Error(response.errors)
    await response.data.content.edges.forEach(edge => {
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
}
