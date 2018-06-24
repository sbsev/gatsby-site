const path = require('path')

const pageTemplate = path.resolve('./src/templates/page.js')
const pagesQuery = `
  {
    content: allContentfulPage {
      edges {
        node {
          slug
        }
      }
    }
  }
`
const postTemplate = path.resolve('./src/templates/post.js')
const postsQuery = `
  {
    content: allContentfulPost {
      edges {
        node {
          slug
        }
      }
    }
  }
`
const pageSets = [
  { query: pagesQuery, component: pageTemplate },
  { query: postsQuery, component: postTemplate },
]

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
        path: node.slug,
        component,
        context: {
          slug: node.slug,
        },
      })
    })
  })
}