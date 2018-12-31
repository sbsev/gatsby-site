import React from 'react'
import { graphql } from 'gatsby'

import Global from '../components/Global'
import PageTitle from '../components/PageTitle'
import PageBody from '../components/styles/PageBody'
import PageMeta from '../components/PageMeta'

const PageTemplate = ({ data, location }) => {
  const { title, body } = data.page
  const { excerpt, html } = body && body.data
  const path = location.pathname
  return (
    <Global pageTitle={title} path={path} description={excerpt}>
      <PageTitle>
        <h1>{title}</h1>
      </PageTitle>
      {html && <PageBody dangerouslySetInnerHTML={{ __html: html }} />}
      <PageMeta {...data.page} />
    </Global>
  )
}

export default PageTemplate

export const query = graphql`
  query($slug: String!) {
    page: contentfulPage(slug: { eq: $slug }) {
      title
      slug
      body {
        data: childMarkdownRemark {
          excerpt
          html
        }
      }
      updated: updatedAt(formatString: "D. MMM YYYY", locale: "de")
    }
  }
`
