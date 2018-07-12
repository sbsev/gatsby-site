import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageTitle from '../components/PageTitle' 
import PostList from '../components/PostList'

const BlogIndex = ({ data }) => (
  <Fragment>
    <Helmet title={data.site.meta.title} />
    <PageTitle text="Blog" />
    <PostList {...data} />
  </Fragment>
)

export default BlogIndex

// postFields defined in src/templates/post.js
// categories defined in src/templates/blogCategory.js
export const blogIndexQuery = graphql`
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
