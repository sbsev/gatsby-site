import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Helmet from '../components/Helmet' 
import PageTitle from '../components/PageTitle' 
import BlogIndex from '../components/BlogIndex'

const Blog = ({ data, location }) => {
  const title = `Blog`
  const path = location.pathname
  return <Layout>
    <Helmet pageTitle={title} site={data.site} path={path} />
    <PageTitle text={title} />
    <BlogIndex {...data} />
  </Layout>
}

export default Blog

export const blogIndexQuery = graphql`
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
  {
    ...siteMetaQuery
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
