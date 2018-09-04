import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import PostList from '../components/PostList'

const blogCategoryTemplate = ({ data, location }) => {
  const { activeCategory = { title: ``, description: { text: `` } } } = data
  const title = `Blog - ${activeCategory.title}`
  const { text } = activeCategory.description
  const path = location.pathname
  return (
    <Layout pageTitle={title} path={path} description={text}>
      <PageTitle text={title} />
      <PostList {...data} />
    </Layout>
  )
}

export default blogCategoryTemplate

export const query = graphql`
  query($slug: String!) {
    posts: allContentfulPost(
      sort: { fields: [date], order: DESC }
      filter: { categories: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          ...postFields
        }
      }
    }
    ...categories
    activeCategory: contentfulBlogCategory(slug: { eq: $slug }) {
      title
      slug
      description {
        text: description
      }
    }
  }
`
