import React from 'react'
import { graphql } from 'gatsby'

import PageTitle from 'components/PageTitle'
import PageBody from 'components/PageBody'
import Toc from 'components/Toc'

export default function PageTemplate({ data }) {
  const { page } = data
  const { title, subtitle, cover, caption, toc, body = {}, updatedAt } = page
  return (
    <>
      <PageTitle {...{ cover, caption }}>
        {subtitle ? (
          <div
            dangerouslySetInnerHTML={{
              __html: `<h1>${title}</h1>` + subtitle.remark.html,
            }}
          />
        ) : (
          <h1>{title}</h1>
        )}
      </PageTitle>
      {body?.remark?.html && (
        <PageBody {...body.remark} {...{ updatedAt, title }}>
          {toc && <Toc />}
        </PageBody>
      )}
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    page: contentfulPage(slug: { eq: $slug }) {
      ...pageFields
    }
  }
`
