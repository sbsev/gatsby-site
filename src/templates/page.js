import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Helmet from '../components/Helmet'
import PageTitle from '../components/PageTitle'
import PageBody from '../components/PageBody'
import PageMeta from '../components/PageMeta'

const PageTemplate = ({ data, location }) => {
  const { page, site } = data
  const { title: { title }, body } = page
  const { excerpt, html } = body && body.data
  const path = location.pathname
  return (
    <Layout>
      <Helmet pageTitle={title} site={site} path={path} description={excerpt} />
      <PageTitle text={title} />
      {html && <PageBody dangerouslySetInnerHTML={{__html: html}} />}
      <PageMeta {...page} />
    </Layout>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query($slug: String!) {
    ...siteMetaQuery
    page: contentfulPage(slug: {eq: $slug}) {
      title {
        title
      }
      slug
      body {
        data: childMarkdownRemark {
          excerpt
          html
        }
      }
      created: createdAt(formatString: "D. MMMM YYYY", locale: "de")
      updated: updatedAt(formatString: "D. MMMM YYYY", locale: "de")
      authors: author {
        name
        email
      }
    }
  }
`