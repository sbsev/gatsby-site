import React from 'react'

import PostList from '../components/PostList'

const BlogIndex = props => (
  <PostList {...props.data} />
)

export default BlogIndex

// postFields defined in src/templates/post.js
export const pageQuery = graphql`
  query BlogIndex {
    site {
      meta: siteMetadata {
        title
      }
    }
    posts: allContentfulPost(
      sort: { fields: [ date ], order: DESC }
    ) {
      edges {
        node {
          ...postFields
        }
      }
    }
    ...categories
  }
`
