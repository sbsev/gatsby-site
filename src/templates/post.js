import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import PostMeta from 'components/PostMeta'
import PageBody from 'components/PageBody'

export default function PostTemplate({ data }) {
  const { title, author, date, cover, body } = data.post
  const { html, timeToRead } = body.remark
  return (
    <>
      <Img {...cover} />
      <h1 css="margin: 2.5em auto 0; padding: 0 1em; text-align: center;">
        {title}
      </h1>
      <PostMeta inTitle {...{ author, date, timeToRead }} />
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
