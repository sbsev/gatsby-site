import React from 'react'
import { graphql } from 'gatsby'

import PageTitle from 'components/PageTitle'
import PostMeta from 'components/PostMeta'
import PageBody from 'components/PageBody'

export default function PostTemplate({ data }) {
  const { title, author, date, cover, body } = data.post
  const { html, timeToRead } = body.remark
  return (
    <>
      <PageTitle cover={cover}>
        <h1>{title}</h1>
        <PostMeta inTitle {...{ author, date, timeToRead }} />
      </PageTitle>
      <PageBody html={html} />
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    post: contentfulPost(slug: { eq: $slug }) {
      ...postFields
    }
  }
`
