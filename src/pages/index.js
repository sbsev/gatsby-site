import { graphql } from 'gatsby'
import React from 'react'
import PageBody from 'components/PageBody'
import PageTitle from 'components/PageTitle'

export default function IndexPage({ data }) {
  const { page, slideshow, updatedAt } = data
  const { subtitle, body, caption } = page
  const { html } = body && body.remark
  return (
    <>
      <PageTitle {...{ slideshow, caption }} css="min-height: 70vh;">
        <div dangerouslySetInnerHTML={{ __html: subtitle.remark.html }} />
      </PageTitle>
      <PageBody {...{ html, updatedAt }} />
    </>
  )
}

export const query = graphql`
  {
    page: contentfulPage(slug: { eq: "/" }) {
      ...pageFields
    }
    slideshow: contentfulSlideshow(title: { eq: "Landing Page" }) {
      slides {
        ...image
      }
    }
  }
`
