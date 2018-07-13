import React, { Fragment } from 'react'

import Helmet from '../components/Helmet' 
import PageTitle from '../components/PageTitle' 
import BlogIndex from '../components/BlogIndex'

const blogCategoryTemplate = ({ data, location }) => {
  const { activeCategory = { title: ``, shortDescription: { text: ``}}, site } = data
  const title = `Blog - ${activeCategory.title}`
  const { text } = activeCategory.shortDescription
  const path = location.pathname
  return <Fragment>
    <Helmet pageTitle={title} site={site} path={path} description={text} />
    <PageTitle text={title} />
    <BlogIndex {...data} />
  </Fragment>
}

export default blogCategoryTemplate

export const blogCategoryQuery = graphql`
  query BlogCategoryBySlug($slug: String!) {
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
      shortDescription {
        text: shortDescription
      }
    }
  }
`
