import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import PageBody from '../components/styles/PageBody'
import PageMeta from '../components/PageMeta'

const PageTemplate = ({ data, location }) => {
  const {
    title: { title },
    body,
  } = data.page
  const { excerpt, html } = body && body.data
  const path = location.pathname
  return (
    <Layout pageTitle={title} path={path} description={excerpt}>
      <PageTitle>
        <h1>{title}</h1>
      </PageTitle>
      {html && <PageBody dangerouslySetInnerHTML={{ __html: html }} />}
      <PageMeta {...data.page} />
    </Layout>
  )
}

export default PageTemplate

export const query = graphql`
  query($slug: String!) {
    page: contentfulPage(slug: { eq: $slug }) {
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
      updated: updatedAt(formatString: "D. MMMM YYYY", locale: "de")
    }
  }
`
