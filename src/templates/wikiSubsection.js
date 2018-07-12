import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'

import PageTitle from '../components/PageTitle'
import Breadcrumbs from '../components/Breadcrumbs'
import SubsectionList from '../components/SubsectionList'

const WikiSubsectionTemplate = props => {
  const { subsection, site, articles } = props.data
  const { sections } = subsection
  const { title, slug, subsections } = sections[0]
  const baseUrl = `/wiki/` + slug
  return (
    <Fragment>
      <Helmet>
        <title>{`${title} | ${site.meta.title}`}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
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
        const link = `${baseUrl}/${subsection.slug}/${article.slug}`
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

export default WikiSubsectionTemplate

export const wikiSectionQuery = graphql`
  query WikiSubsectionBySlug($slug: String!) {
    site {
      meta: siteMetadata {
        title
        url: siteUrl
      }
    }
    subsection: contentfulWikiSubsection(slug: { eq: $slug }) {
      title
      slug
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