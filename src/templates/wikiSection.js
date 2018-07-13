import React, { Fragment } from 'react'

import Helmet from '../components/Helmet'
import PageTitle from '../components/PageTitle'
import Breadcrumbs from '../components/Breadcrumbs'
import SubsectionList from '../components/SubsectionList'
import ArticleList from '../components/ArticleList'

const WikiSectionTemplate = ({ data, location }) => {
  const { section, site, articles } = data
  const { title, slug, subsections, description } = section
  const path = location.pathname
  return (
    <Fragment>
      <Helmet pageTitle={title} site={site} path={path} description={description.text} />
      <Breadcrumbs path={path} />
      <PageTitle text={title} />
      {description && <div dangerouslySetInnerHTML={{
        __html: description.data.html
      }} />}
      {subsections && <SubsectionList
        sectionSlug={slug}
        subsections={subsections}
      />}
      {articles && <ArticleList articles={articles} />}
    </Fragment>
  )
}

export default WikiSectionTemplate

export const wikiSectionQuery = graphql`
  query WikiSectionBySlug($slug: String!) {
    ...siteMetaQuery
    section: contentfulWikiSection(slug: { eq: $slug }) {
      title
      slug
      description: shortDescription {
        text: shortDescription
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