import React from 'react'

import PostList from '../components/PostList'

const CategoryIndex = props => (
  <PostList {...props.data} />
)

export default CategoryIndex

export const categories = graphql`
  fragment categories on RootQueryType {
    categories: allContentfulCategory(
      sort: { fields: [title], order: ASC}
    ) {
      edges {
        node {
          title
          slug
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
    activeCategory: contentfulCategory(slug: {eq: $slug}) {
      slug
    }
  }
`
