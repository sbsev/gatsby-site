import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import PageBody from '../components/styles/PageBody'
import PageMeta from '../components/PageMeta'

const LandingPage = ({ data: { page }, location }) => {
  const {
    title: { title },
    subtitle: { subtitle },
    body,
  } = page
  const { excerpt, html } = body && body.data
  return (
    <Layout pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle text={title} />
      {html && (
        <PageBody isLanding dangerouslySetInnerHTML={{ __html: html }} />
      )}
      <PageMeta {...page} />
    </Layout>
  )
}

export default LandingPage

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
