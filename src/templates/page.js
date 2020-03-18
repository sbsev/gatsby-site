import React from 'react'
import { graphql } from 'gatsby'

import Global from 'components/Global'
import PageTitle from 'components/PageTitle'
import PageBody from 'components/PageBody'
import Toc from 'components/Toc'

export default function PageTemplate({ data, location }) {
  const { page } = data
  const { title, subtitle, cover, caption, toc, body, updatedAt } = page
  const { excerpt, html } = (body && body.remark) || { excerpt: ``, html: `` }
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle cover={cover} caption={caption}>
        <h1>{title}</h1>
        {subtitle && (
          <div
            dangerouslySetInnerHTML={{
              __html: subtitle.remark.html,
            }}
          />
        )}
      </PageTitle>
      {html && <PageBody {...{ html, updatedAt, title }}>{toc && <Toc />}</PageBody>}
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
