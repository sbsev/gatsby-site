import React from 'react'

import PostExcerpt from './PostExcerpt'

const PostsList = ({ posts }) => (
  <div>
    {posts.edges.map(({ node: post }) => (
      <PostExcerpt key={post.slug} post={post} />
    ))}
  </div>
)

export default PostsList