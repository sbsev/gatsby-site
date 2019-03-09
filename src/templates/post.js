import React from "react"
import { graphql } from "gatsby"

import Global from "../components/Global"
import PostTitle from "../components/PostTitle"
import PageBody from "../components/PageBody"

const PostTemplate = ({ data, location }) => {
  const { title, body } = data.post
  const { html, excerpt } = body.remark
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PostTitle {...data} />
      <PageBody html={html} />
    </Global>
  )
}

export default PostTemplate

export const query = graphql`
  query($slug: String!) {
    post: contentfulPost(slug: { eq: $slug }) {
      ...postFields
    }
  }
`
