import React, { Fragment } from 'react'

import Helmet from '../components/Helmet' 
import PageTitle from '../components/PageTitle' 
import BlogIndex from '../components/BlogIndex'

const Blog = ({ data, location }) => {
  const title = `Blog`
  const path = location.pathname
  return <Fragment>
    <Helmet pageTitle={title} site={data.site} path={path} />
    <PageTitle text={title} />
    <BlogIndex {...data} />
  </Fragment>
}

export default Blog

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

export const blogIndexQuery = graphql`
  query Blog {
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
