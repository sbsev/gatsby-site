import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageTitle from '../components/PageTitle'
import PageBody from '../components/PageBody'
import PageMeta from '../components/PageMeta'

const PageTemplate = props => {
  const { page, site } = props.data
  const { title, slug, body } = page
  return (
    <Fragment>
      <Helmet>
        <title>{`${title.title} | ${site.meta.title}`}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title.title} />
        <meta
          property="og:url"
          content={`${site.meta.url}/pages/${slug}`}
        />
        <meta property="og:description" content={body.data.excerpt} />
        <meta name="description" content={body.data.excerpt} />
      </Helmet>
      <PageTitle text={title.title} />
      {body && <PageBody dangerouslySetInnerHTML={{__html: body.data.html}} />}
      <PageMeta {...page} />
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
          excerpt
          html
          headings {
            value
            depth
          }
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