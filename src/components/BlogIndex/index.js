import React from 'react'

import { BlogIndexLayout } from './styles'
import PostsList from '../PostsList'
import CategoryList from '../CategoryList'

const BlogIndex = ({ posts, categories }) => (
  <BlogIndexLayout>
    <PostsList posts={posts} />
    <CategoryList
      title="Kategorien"
      categories={categories.edges}
    />
  </BlogIndexLayout>
)

export default BlogIndex