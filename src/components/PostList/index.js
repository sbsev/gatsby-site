import React, { Fragment } from 'react'

import { Posts } from './styles'
import CategoryList from '../CategoryList'
import PostExcerpt from '../PostExcerpt'

const PostList = ({ posts, categories }) => (
  <Fragment>
    <CategoryList title="Kategorien" categories={categories.edges} />
    {posts && (
      <Posts>
        {posts.edges.map(({ node: post }) => (
          <PostExcerpt key={post.slug} post={post} />
        ))}
      </Posts>
    )}
  </Fragment>
)

export default PostList
