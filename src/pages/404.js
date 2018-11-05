import React from 'react'
import { graphql } from 'gatsby'

import Global from '../components/Global'
import PageTitle from '../components/PageTitle'
import Logo from '../assets/logo'
import PageBody from '../components/styles/PageBody'
import PageMeta from '../components/PageMeta'

const PageNotFound = ({ data: { page }, location }) => {
  const {
    title: { title },
    body,
  } = page
  const { excerpt, html } = body && body.data
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle>
        <Logo width="calc(5em + 5vw)" />
        <h1>{title}</h1>
      </PageTitle>
      {html && <PageBody dangerouslySetInnerHTML={{ __html: html }} />}
      <PageMeta {...page} />
    </Global>
  )
}

export default PageNotFound

export const query = graphql`
  {
    page: contentfulPage(slug: { eq: "404" }) {
      title {
        title
      }
      subtitle {
        subtitle
      }
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
