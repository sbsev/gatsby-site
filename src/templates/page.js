import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import PageTitle from '../components/PageTitle'

const PageTemplate = props => {
  const { page, site: { meta: { siteTitle, siteUrl } } } = props.data
  return (
    <Fragment>
      <Helmet>
        <title>{`${page.title.title} | ${siteTitle}`}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title.title} />
        <meta
          property="og:url"
          content={`${siteUrl}/pages/${page.slug}`}
        />
        <meta property="og:description" content={page.excerpt} />
        <meta name="description" content={page.excerpt} />
      </Helmet>
      <PageTitle title={page.title.title} updated={page.updated} />
      <div dangerouslySetInnerHTML={{ __html: page.body.childMarkdownRemark.html }} />
    </Fragment>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      meta: siteMetadata {
        siteTitle: title
        siteUrl
      }
    }
    page: contentfulPage(slug: { eq: $slug }) {
      title {
        title
      }
      slug
      updated: updatedAt(formatString: "MMMM Do, YYYY")
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`