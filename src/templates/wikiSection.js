import React from "react"
import { graphql } from "gatsby"

import Global from "../components/Global"
import PageTitle from "../components/PageTitle"
import Breadcrumbs from "../components/Breadcrumbs"
import SubsectionList from "../components/SubsectionList"
import ArticleList from "../components/ArticleList"

const WikiSectionTemplate = ({ data, location }) => {
  const { section, articles } = data
  const { title, slug, subsections, description } = section
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
        <SubsectionList sectionSlug={slug} subsections={subsections} />
      )}
      {articles && <ArticleList articles={articles} />}
    </Global>
  )
}

export default WikiSectionTemplate

export const query = graphql`
  query($slug: String!) {
    section: contentfulWikiSection(slug: { eq: $slug }) {
      title
      slug
      description {
        text: description
        remark: childMarkdownRemark {
          html
        }
      }
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
