import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageTitle from '../components/PageTitle' 
import PostList from '../components/PostList'

const blogCategoryTemplate = ({ data }) => (
  <Fragment>
    <Helmet title={data.site.meta.title} />
    <PageTitle text="Blog" />
    <PostList {...data} />
  </Fragment>
)

export default blogCategoryTemplate

export const categories = graphql`
  fragment categories on RootQueryType {
    categories: allContentfulBlogCategory(
      sort: { fields: [title], order: ASC}
    ) {
      edges {
        node {
          title
          slug
          icon {
            title
            file {
              url
            }
          }
        }
      }
    }
  }
`

// postFields defined in src/templates/post.js
export const blogCategoryQuery = graphql`
  query BlogCategoryBySlug($slug: String!) {
    site {
      meta: siteMetadata {
        title
      }
    }
    posts: allContentfulPost(
      sort: { fields: [ date ], order: DESC }
      filter: { category: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          ...postFields
        }
      }
    }
    ...categories
    activeCategory: contentfulBlogCategory(slug: {eq: $slug}) {
      slug
    }
  }
`
