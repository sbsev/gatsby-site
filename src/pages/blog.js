import React from 'react'
import Helmet from 'react-helmet'

import PostExcerpt from '../components/PostExcerpt'

const BlogIndex = props => {
  const siteTitle = props.data.site.siteMetadata.title
  const posts = props.data.posts.edges
  return (
    <React.Fragment>
      <Helmet title={siteTitle} />
      {posts.map(({ node: post }) => (
        <PostExcerpt key={post.slug} post={post} />
      ))}
    </React.Fragment>
  )
}

export default BlogIndex

// postFields defined in src/templates/post.js
export const pageQuery = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
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
  }
`
