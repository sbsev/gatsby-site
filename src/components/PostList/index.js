import React from "react"

import PostExcerpt from "../PostExcerpt"
import { Grid } from "../styles"
import { PostListContainer } from "./styles"

const PostList = ({ posts, ...rest }) => (
  <PostListContainer>
    <Grid minWidth="17em" maxWidth="24em" gap="2em 1.5em">
      {posts.map(({ node }) => (
        <PostExcerpt key={node.slug} post={node} {...rest} />
      ))}
    </Grid>
  </PostListContainer>
)

export default PostList
