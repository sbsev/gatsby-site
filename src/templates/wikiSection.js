import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import Breadcrumbs from '../components/Breadcrumbs'
import SubsectionList from '../components/SubsectionList'
import ArticleList from '../components/ArticleList'

const WikiSectionTemplate = ({ data, location }) => {
  const { section, articles } = data
  const { title, slug, subsections, description } = section
  const path = location.pathname
  return (
    <Layout pageTitle={title} path={path} description={description.text}>
      <Breadcrumbs path={path} />
      <PageTitle text={title} />
      {description && (
        <div
          dangerouslySetInnerHTML={{
            __html: description.data.html,
          }}
        />
      )}
      {subsections && (
        <SubsectionList sectionSlug={slug} subsections={subsections} />
      )}
      {articles && <ArticleList articles={articles} />}
    </Layout>
  )
}

export default WikiSectionTemplate

export const wikiSectionQuery = graphql`
  query($slug: String!) {
    section: contentfulWikiSection(slug: { eq: $slug }) {
      title
      slug
      description {
        text: description
        data: childMarkdownRemark {
          html
        }
      }
      subsections {
        title
        slug
      }
    }
    articles: allContentfulWikiArticle(
      filter: { section: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          ...articleFields
        }
      }
    }
  }
`
