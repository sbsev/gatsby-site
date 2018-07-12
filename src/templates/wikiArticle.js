import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import Breadcrumbs from '../components/Breadcrumbs'
import PageTitle from '../components/PageTitle'
import PageBody from '../components/PageBody'
import PageMeta from '../components/PageMeta'

const WikiArticleTemplate = props => {
  const { article, site } = props.data
  const { title, slug, section, subsection, body } = article
  return (
    <Fragment>
      <Helmet>
        <title>{`${title.title} | ${site.meta.title}`}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title.title} />
        <meta
          property="og:url"
          content={`${site.meta.url}/articles/${slug}`}
        />
        <meta property="og:description" content={body.data.excerpt} />
        <meta name="description" content={body.data.excerpt} />
      </Helmet>
      <Breadcrumbs path={props.location.pathname} />
      <PageTitle text={title.title} />
      {body && <PageBody dangerouslySetInnerHTML={{__html: body.data.html}} />}
      <PageMeta {...article} />
    </Fragment>
  )
}

export default WikiArticleTemplate

export const wikiArticleQuery = graphql`
  query WikiArticleBySlug($slug: String!) {
    site {
      meta: siteMetadata {
        title
        url: siteUrl
      }
    }
    article: contentfulWikiArticle(slug: {eq: $slug}) {
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
      created: createdAt(formatString: "D. MMMM YYYY", locale: "de")
      updated: updatedAt(formatString: "D. MMMM YYYY", locale: "de")
      authors: author {
        name
        email
      }
      section {
        title
        slug
      }
      subsection {
        title
        slug
      }
    }
  }
`