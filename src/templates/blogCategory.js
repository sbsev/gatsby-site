import React from 'react'
import { graphql } from 'gatsby'

import Global from '../components/Global'
import PageTitle from '../components/PageTitle'
import CategoryList from '../components/CategoryList'
import PostList from '../components/PostList'

const CategoryTemplate = ({ data, location, title }) => {
  const { active, categories } = data
  let { posts } = data
  const path = location.pathname
  if (active.slug !== `/`) {
    posts.edges = posts.edges.filter(({ node }) =>
      node.categories.map(category => category.slug).includes(active.slug)
    )
  }
  return (
    <Global pageTitle={title} path={path} description={active.description.text}>
      <PageTitle>
        <h1>{title}</h1>
      </PageTitle>
      <CategoryList categories={categories.edges} />
      {posts && <PostList posts={posts.edges} />}
    </Global>
  )
}

export default CategoryTemplate

CategoryTemplate.defaultProps = {
  title: `Blog`,
}

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
  query($slug: String!) {
    posts: allContentfulPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          ...postFields
        }
      }
    }
    ...categories
    active: contentfulBlogCategory(slug: { eq: $slug }) {
      title
      slug
      description {
        text: description
      }
    }
  }
`
