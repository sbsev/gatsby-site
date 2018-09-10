import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import PostList from '../components/PostList'

const Blog = ({ data, location }) => {
  const title = `Blog`
  return (
    <Layout pageTitle={title} path={location.pathname}>
      <PageTitle text={title} />
      <PostList {...data} />
    </Layout>
  )
}

export default Blog

export const query = graphql`
  fragment categories on Query {
    categories: allContentfulBlogCategory(
      sort: { fields: [title], order: ASC }
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
  {
    posts: allContentfulPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          ...postFields
        }
      }
    }
    ...categories
  }
`
