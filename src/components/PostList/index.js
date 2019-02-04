import React from "react"

import PostExcerpt from "../PostExcerpt"
import { Container } from "./styles"

const PostList = ({ posts, ...rest }) => (
  <Container>
    {posts.map(({ node }) => (
      <PostExcerpt key={node.slug} post={node} {...rest} />
    ))}
  </Container>
)

export default PostList
