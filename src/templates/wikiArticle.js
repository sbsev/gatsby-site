import React from "react"
import { graphql } from "gatsby"

import Global from "../components/Global"
import Breadcrumbs from "../components/Breadcrumbs"
import PageTitle from "../components/PageTitle"
import PageBody from "../components/PageBody"

const WikiArticleTemplate = ({ data, location }) => {
  const { title, body, updatedAt } = data.article
  const { html, excerpt } = body.remark
  const path = location.pathname
  return (
    <Global pageTitle={title} path={path} description={excerpt}>
      <Breadcrumbs path={path} />
      <PageTitle>
        <h1>{title}</h1>
      </PageTitle>
      <PageBody html={html} updated={updatedAt} />
    </Global>
  )
}

export default WikiArticleTemplate

export const query = graphql`
  query($slug: String!) {
    article: contentfulWikiArticle(slug: { eq: $slug }) {
      ...articleFields
    }
  }
`
