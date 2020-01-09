import { graphql } from 'gatsby'
import React from 'react'
import Global from 'components/Global'
import PageBody from 'components/PageBody'
import PageTitle from 'components/PageTitle'

export default function IndexPage({ data, location }) {
  const { page, slideshow, updatedAt } = data
  const { title, subtitle, body, caption } = page
  const { excerpt, html } = body && body.remark
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle {...{ slideshow, caption }} css="min-height: 70vh;">
        <div dangerouslySetInnerHTML={{ __html: subtitle.remark.html }} />
      </PageTitle>
      <PageBody {...{ html, updatedAt }} />
    </Global>
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
