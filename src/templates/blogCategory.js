import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Helmet from '../components/Helmet' 
import PageTitle from '../components/PageTitle' 
import BlogIndex from '../components/BlogIndex'

const blogCategoryTemplate = ({ data, location }) => {
  const { activeCategory = { title: ``, description: { text: ``}}, site } = data
  const title = `Blog - ${activeCategory.title}`
  const { text } = activeCategory.description
  const path = location.pathname
  return <Layout>
    <Helmet pageTitle={title} site={site} path={path} description={text} />
    <PageTitle text={title} />
    <BlogIndex {...data} />
  </Layout>
}

export default blogCategoryTemplate

export const blogCategoryQuery = graphql`
  query($slug: String!) {
    ...siteMetaQuery
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
      title
      slug
      description {
        text: description
      }
    }
  }
`
