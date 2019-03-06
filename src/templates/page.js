import React from "react"
import { graphql } from "gatsby"

import Global from "../components/Global"
import PageTitle from "../components/PageTitle"
import PageBody from "../components/PageBody"

const PageTemplate = ({ data, location }) => {
  const { title, body, updatedAt } = data.page
  const { excerpt, html } = body && body.remark
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle>
        <h1>{title}</h1>
      </PageTitle>
      <PageBody html={html} updated={updatedAt} />
    </Global>
  )
}

export default PageTemplate

export const query = graphql`
  query($slug: String!) {
    page: contentfulPage(slug: { eq: $slug }) {
      title
      slug
      body {
        remark: childMarkdownRemark {
          excerpt
          html
        }
      }
      updatedAt(formatString: "D. MMM YYYY", locale: "de")
    }
  }
`
