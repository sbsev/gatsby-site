import React from 'react'

import Masonry from '../Masonry'
import PostExcerpt from '../PostExcerpt'
import { Container } from './styles'

const PostList = ({ posts }) => (
  <Container>
    <Masonry>
      {posts.map(({ node }) => (
        <PostExcerpt key={node.slug} post={node} />
      ))}
    </Masonry>
  </Container>
)

export default PostList
