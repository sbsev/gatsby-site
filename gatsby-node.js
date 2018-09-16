const path = require('path')

const pageTemplate = path.resolve('./src/templates/page.js')
const postTemplate = path.resolve('./src/templates/post.js')
const blogCategoryTemplate = path.resolve('./src/templates/blogCategory.js')
const wikiSubsectionTemplate = path.resolve('./src/templates/wikiSubsection.js')
const wikiSectionTemplate = path.resolve('./src/templates/wikiSection.js')
const wikiArticleTemplate = path.resolve('./src/templates/wikiArticle.js')

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

const wikiSubsectionFragment = `
  sections: wiki_section {
    slug
  }
`

const wikiArticleFragment = `
  section {
    slug
  }
  subsection {
    slug
  }
`

const pageSets = [
  {
    query: contentfulQuery(`Page`),
    component: pageTemplate,
  },
  {
    query: contentfulQuery(`Post`),
    component: postTemplate,
  },
  {
    query: contentfulQuery(`BlogCategory`),
    component: blogCategoryTemplate,
  },
  {
    query: contentfulQuery(`WikiSection`),
    component: wikiSectionTemplate,
  },
  {
    query: contentfulQuery(`WikiSubsection`, wikiSubsectionFragment),
    component: wikiSubsectionTemplate,
  },
  {
    query: contentfulQuery(`WikiArticle`, wikiArticleFragment),
    component: wikiArticleTemplate,
  },
]

const pagePath = node => {
  switch (node.internal.type) {
    case `ContentfulPost`:
    case `ContentfulBlogCategory`:
      return `blog/` + node.slug
    case `ContentfulWikiSection`:
      return `wiki/${node.slug}`
    case `ContentfulWikiSubsection`:
      return `wiki/${node.sections[0].slug}/${node.slug}`
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
    fromPath: `https://studenten-bilden-schueler.netlify.com/*`,
    toPath: `https://studenten-bilden-schueler.de/:splat`,
    isPermanent: true,
  })

  createRedirect({
    fromPath: `/index.php/*`,
    toPath: `/:splat`,
    isPermanent: true,
  })

  pageSets.forEach(async ({ query, component }) => {
    const response = await graphql(query)
    if (response.errors) {
      console.error(response.errors)
      throw new Error(response.errors)
    }
    response.data.content.edges.forEach(({ node }) => {
      // exclude pages that are stored locally in src/pages
      if (![`/`, `standorte`].includes(node.slug)) {
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
