import React from 'react'
import { graphql } from 'gatsby'

import Global from 'components/Global'
import PageTitle from 'components/PageTitle'
import PostMeta from 'components/PostMeta'
import PageBody from 'components/PageBody'

export default function PostTemplate({ data, location }) {
  const { title, author, date, cover, body } = data.post
  const { html, excerpt, timeToRead } = body.remark
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle cover={cover}>
        <h1>{title}</h1>
        <PostMeta inTitle {...{ author, date, timeToRead }} />
      </PageTitle>
      <PageBody html={html} />
    </Global>
  )
}

export const query = graphql`
  query($slug: String!) {
    post: contentfulPost(slug: { eq: $slug }) {
      ...postFields
    }
  }
`
