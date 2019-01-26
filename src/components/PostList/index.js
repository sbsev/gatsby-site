import React from "react"

import Masonry from "../Masonry"
import PostExcerpt from "../PostExcerpt"
import { Container } from "./styles"

const PostList = ({ posts, ...rest }) => (
  <Container>
    <Masonry>
      {posts.map(({ node }) => (
        <PostExcerpt key={node.slug} post={node} {...rest} />
      ))}
    </Masonry>
  </Container>
)

export default PostList
