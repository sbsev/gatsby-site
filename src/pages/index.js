import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import LandingGrid from '../components/LandingGrid'
import PageBody from '../components/PageBody'
import PageMeta from '../components/PageMeta'

const LandingPage = ({ data, location }) => {
  const { images, page } = data
  const {
    title: { title },
    subtitle: { subtitle },
    body,
  } = page
  const { excerpt, html } = body && body.data
  return (
    <Layout pageTitle={title} path={location.pathname} description={excerpt}>
      <LandingGrid {...{ title, subtitle, images: images.edges }} />
      {html && <PageBody dangerouslySetInnerHTML={{ __html: html }} />}
      <PageMeta {...page} />
    </Layout>
  )
}

export default LandingPage

export const query = graphql`
  {
    page: contentfulPage(slug: { eq: "/" }) {
      title {
        title
      }
      subtitle {
        subtitle
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
    images: allContentfulAsset(
      filter: { file: { fileName: { regex: "/stock/" } } }
    ) {
      edges {
        node {
          title
          fluid {
            src
          }
        }
      }
    }
  }
`
