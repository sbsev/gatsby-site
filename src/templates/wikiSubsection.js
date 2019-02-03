import React from "react"
import { graphql } from "gatsby"

import Global from "../components/Global"
import PageTitle from "../components/PageTitle"
import Breadcrumbs from "../components/Breadcrumbs"
import SubsectionList from "../components/SubsectionList"
import ArticleList from "../components/ArticleList"

const WikiSubsectionTemplate = ({ data, location }) => {
  const { subsection, articles } = data
  const { section, description } = subsection
  const { title, slug, subsections } = section
  const path = location.pathname
  return (
    <Global pageTitle={title} path={path} description={description.text}>
      <Breadcrumbs path={path} />
      <PageTitle>
        <h1>{title}</h1>
      </PageTitle>
      {description && (
        <div
          dangerouslySetInnerHTML={{
            __html: description.remark.html,
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
    </Global>
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
        remark: childMarkdownRemark {
          html
        }
      }
      section {
        title
        slug
        subsections: wiki_subsection {
          title
          slug
          icon {
            title
            file {
              url
            }
          }
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
