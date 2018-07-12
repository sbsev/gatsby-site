import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import PageTitle from '../components/PageTitle'
import Breadcrumbs from '../components/Breadcrumbs'
import SubsectionList from '../components/SubsectionList'

const WikiSectionTemplate = props => {
  const { section, site, articles } = props.data
  const { title, slug, subsections } = section
  const baseUrl = `/wiki/` + slug
  return (
    <Fragment>
      <Helmet>
        <title>{`${title} | ${site.meta.title}`}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title.title} />
        <meta
          property="og:url"
          content={`${site.meta.url}/articles/${slug}`}
        />
      </Helmet>
      <Breadcrumbs path={props.location.pathname} />
      <PageTitle text={title} />
      {subsections && <SubsectionList sectionSlug={slug} subsections={subsections} />}
      {articles && <h2>Artikel</h2>}
      {articles && articles.edges.map(({ node: article }) => {
        const subSlug = article.subsection ? article.subsection.slug + `/` : ``
        const link = `${baseUrl}/${subSlug}${article.slug}`
        return <Fragment key={article.title.title}>
          <Link to={link}>
            <h4>{article.title.title}</h4>
          </Link>
          {article.body.data.headings.map(heading =>
            <span key={heading.value}>{heading.value}<br/></span>
          )}
        </Fragment>
      })}
    </Fragment>
  )
}

export default WikiSectionTemplate

export const wikiSectionQuery = graphql`
  query WikiSectionBySlug($slug: String!) {
    site {
      meta: siteMetadata {
        title
        url: siteUrl
      }
    }
    section: contentfulWikiSection(slug: { eq: $slug }) {
      title
      slug
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
          title {
            title
          }
          slug
          subsection {
            slug
          }
          body {
            data: childMarkdownRemark {
              headings {
                value
                depth
              }
            }
          }
        }
      }
    }
  }
`