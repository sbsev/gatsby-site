import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageTitle from '../components/PageTitle'
import PageBody from '../components/PageBody'
import PageMeta from '../components/PageMeta'

const PageTemplate = props => {
  const { page, site } = props.data
  return (
    <Fragment>
      <Helmet>
        <title>{`${page.title.title} | ${site.meta.title}`}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={page.title.title} />
        <meta
          property="og:url"
          content={`${site.meta.url}/pages/${page.slug}`}
        />
        <meta property="og:description" content={page.excerpt} />
        <meta name="description" content={page.excerpt} />
      </Helmet>
      <PageTitle title={page.title.title} />
      {page.body && <PageBody dangerouslySetInnerHTML={{__html: page.body.data.html}} />}
      <PageMeta updated={page.updated} authors={page.author} />
    </Fragment>
  )
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      meta: siteMetadata {
        title
        url: siteUrl
      }
    }
    page: contentfulPage(slug: {eq: $slug}) {
      title {
        title
      }
      slug
      body {
        data: childMarkdownRemark {
          html
          headings {
            value
            depth
          }
        }
      }
      updated: updatedAt(formatString: "D. MMMM YYYY", locale: "de")
      author {
        name
      }
    }
  }
`