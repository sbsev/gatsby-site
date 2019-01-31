import React, { useState } from "react"
import { graphql } from "gatsby"

import Global from "../components/Global"
import PageTitle from "../components/PageTitle"
import TagList from "../components/TagList"
import PostList from "../components/PostList"

const BlogPage = ({ data, location, title = `Blog` }) => {
  const { posts, tags } = data
  const [tag, setTag] = useState(`Alle`)
  const filteredPosts =
    tag === `Alle`
      ? posts.edges
      : posts.edges.filter(({ node }) =>
        node.tags.map(tag => tag.title).includes(tag)
      )
  return (
    <Global pageTitle={title} path={location.pathname}>
      <PageTitle cols="2 / -2">
        <h1>{title}</h1>
      </PageTitle>
      <TagList tags={tags.edges} activeTag={tag} setTag={setTag} />
      {posts && (
        <PostList posts={filteredPosts} activeTag={tag} setTag={setTag} />
      )}
    </Global>
  )
}

export default BlogPage

export const query = graphql`
  {
    posts: allContentfulPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          ...postFields
        }
      }
    }
    tags: allContentfulBlogTag(sort: { fields: [title], order: ASC }) {
      edges {
        node {
          title
          icon {
            title
            file {
              url
            }
          }
        }
      }
    }
  }
`
