const path = require('path')

const pageTemplate = path.resolve('./src/templates/page.js')
const postTemplate = path.resolve('./src/templates/post.js')
const blogCategoryTemplate = path.resolve('./src/templates/blogCategory.js')

const contentfulQuery = contentType => `
  {
    content: allContentful${contentType} {
      edges {
        node {
          parent {
            id
          }
          slug
        }
      }
    }
  }
`

const pageSets = [
  { query: contentfulQuery(`Page`), component: pageTemplate },
  { query: contentfulQuery(`Post`), component: postTemplate },
  { query: contentfulQuery(`Category`), component: blogCategoryTemplate },
]

const pagePath = node => {
  switch (node.parent.id) {
    case `Post`:
      return `/blog/` + node.slug
    case `Category`:
      return `/blog/category/` + node.slug
    default:
      return node.slug
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  pageSets.forEach(async ({ query, component }) => {
    const response = await graphql(query)
    if (response.errors) {
      console.error(response.errors)
      throw new Error(response.errors)
    }
    response.data.content.edges.forEach(({ node }) => {
      createPage({
        path: pagePath(node),
        component,
        context: {
          slug: node.slug,
        },
      })
    })
  })
}