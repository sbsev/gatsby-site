import React from 'react'
import { graphql } from 'gatsby'

import Global from '../components/Global'
import Breadcrumbs from '../components/Breadcrumbs'
import PageTitle from '../components/PageTitle'
import PageBody from '../components/styles/PageBody'
import PageMeta from '../components/PageMeta'

const WikiArticleTemplate = ({ data, location }) => {
  const { title, body } = data.article
  const { html, excerpt } = body.data
  const path = location.pathname
  return (
    <Global pageTitle={title} path={path} description={excerpt}>
      <Breadcrumbs path={path} />
      <PageTitle>
        <h1>{title}</h1>
      </PageTitle>
      <PageBody dangerouslySetInnerHTML={{ __html: html }} />
      <PageMeta {...data.article} />
    </Global>
  )
}

export default WikiArticleTemplate

export const query = graphql`
  fragment articleFields on ContentfulWikiArticle {
    title
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
    created: createdAt(formatString: "D. MMM YYYY", locale: "de")
    updated: updatedAt(formatString: "D. MMM YYYY", locale: "de")
    section {
      title
      slug
    }
    subsection {
      title
      slug
    }
  }
  query($slug: String!) {
    article: contentfulWikiArticle(slug: { eq: $slug }) {
      ...articleFields
    }
  }
`
