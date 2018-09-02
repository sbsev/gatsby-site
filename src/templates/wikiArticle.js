import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Breadcrumbs from '../components/Breadcrumbs'
import PageTitle from '../components/PageTitle'
import PageBody from '../components/PageBody'
import PageMeta from '../components/PageMeta'

const WikiArticleTemplate = ({ data, location }) => {
  const {
    title: { title },
    body,
  } = data.article
  const { html, excerpt } = body.data
  const path = location.pathname
  return (
    <Layout pageTitle={title} path={path} description={excerpt}>
      <Breadcrumbs path={path} />
      <PageTitle text={title} />
      <PageBody dangerouslySetInnerHTML={{ __html: html }} />
      <PageMeta {...data.article} />
    </Layout>
  )
}

export default WikiArticleTemplate

export const query = graphql`
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
  query($slug: String!) {
    article: contentfulWikiArticle(slug: { eq: $slug }) {
      ...articleFields
    }
  }
`
