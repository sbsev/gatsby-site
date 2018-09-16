import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import Breadcrumbs from '../components/Breadcrumbs'
import SubsectionList from '../components/SubsectionList'
import ArticleList from '../components/ArticleList'

const WikiSubsectionTemplate = ({ data, location }) => {
  const { subsection, articles } = data
  const { sections, description } = subsection
  const { title, slug, subsections } = sections[0]
  const path = location.pathname
  return (
    <Layout pageTitle={title} path={path} description={description.text}>
      <Breadcrumbs path={path} />
      <PageTitle>
        <h1>{title}</h1>
      </PageTitle>
      {description && (
        <div
          dangerouslySetInnerHTML={{
            __html: description.data.html,
          }}
        />
      )}
      {subsections && (
        <SubsectionList
          sectionSlug={slug}
          subsections={subsections}
          path={path}
        />
      )}
      {articles && <ArticleList articles={articles} />}
    </Layout>
  )
}

export default WikiSubsectionTemplate

export const query = graphql`
  query($slug: String!) {
    subsection: contentfulWikiSubsection(slug: { eq: $slug }) {
      title
      slug
      description {
        text: description
        data: childMarkdownRemark {
          html
        }
      }
      sections: wiki_section {
        title
        slug
        subsections {
          title
          slug
        }
      }
    }
    articles: allContentfulWikiArticle(
      filter: { subsection: { slug: { eq: $slug } } }
    ) {
      edges {
        node {
          ...articleFields
        }
      }
    }
  }
`
