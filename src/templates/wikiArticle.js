import React, { Fragment } from 'react'

import Helmet from '../components/Helmet'
import Breadcrumbs from '../components/Breadcrumbs'
import PageTitle from '../components/PageTitle'
import PageBody from '../components/PageBody'
import PageMeta from '../components/PageMeta'

const WikiArticleTemplate = ({ data, location }) => {
  const { article, site } = data
  const { title: { title }, body } = article
  const { html, excerpt } = body.data
  const path = location.pathname
  return (
    <Fragment>
      <Helmet pageTitle={title} site={site} path={path} description={excerpt} />
      <Breadcrumbs path={path} />
      <PageTitle text={title} />
      <PageBody dangerouslySetInnerHTML={{__html: html}} />
      <PageMeta {...article} />
    </Fragment>
  )
}

export default WikiArticleTemplate

export const articleFields = graphql`
  fragment articleFields on ContentfulWikiArticle {
    title {
      title
    }
    slug
    body {
      data: childMarkdownRemark {
        html
        excerpt
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
`

export const wikiArticleQuery = graphql`
  query WikiArticleBySlug($slug: String!) {
    ...siteMetaQuery
    article: contentfulWikiArticle(slug: {eq: $slug}) {
      ...articleFields
    }
  }
`