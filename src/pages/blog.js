import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import BlogIndex from '../components/BlogIndex'

const Blog = ({ data, location }) => {
  const title = `Blog`
  return (
    <Layout pageTitle={title} path={location.pathname}>
      <PageTitle text={title} />
      <BlogIndex {...data} />
    </Layout>
  )
}

export default Blog

export const blogIndexQuery = graphql`
  fragment categories on RootQueryType {
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
