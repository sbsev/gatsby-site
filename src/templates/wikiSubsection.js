import React, { Fragment } from 'react'

import Helmet from '../components/Helmet'
import PageTitle from '../components/PageTitle'
import Breadcrumbs from '../components/Breadcrumbs'
import SubsectionList from '../components/SubsectionList'
import ArticleList from '../components/ArticleList'

const WikiSubsectionTemplate = ({ data, location }) => {
  const { subsection, site, articles } = data
  const { sections, description } = subsection
  const { title, slug, subsections } = sections[0]
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
        path={path}
      />}
      {articles && <ArticleList articles={articles} />}
    </Fragment>
  )
}

export default WikiSubsectionTemplate

export const wikiSectionQuery = graphql`
  query WikiSubsectionBySlug($slug: String!) {
    ...siteMetaQuery
    subsection: contentfulWikiSubsection(slug: { eq: $slug }) {
      title
      slug
      description: shortDescription {
        text: shortDescription
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