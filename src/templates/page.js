import React from "react"
import { graphql } from "gatsby"

import Global from "../components/Global"
import PageTitle from "../components/PageTitle"
import PageBody from "../components/PageBody"

export default function PageTemplate({ data, location }) {
  const { page, updatedAt } = data
  const { title, subtitle, cover, body } = page
  const { excerpt, html } = (body && body.remark) || { excerpt: ``, html: `` }
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle cover={cover}>
        <h1>{title}</h1>
        {subtitle && (
          <div
            dangerouslySetInnerHTML={{
              __html: subtitle.remark.html,
            }}
          />
        )}
      </PageTitle>
      {html && <PageBody html={html} updated={updatedAt} />}
    </Global>
  )
}

export const query = graphql`
  query($slug: String!) {
    page: contentfulPage(slug: { eq: $slug }) {
      ...pageFields
    }
  }
`
