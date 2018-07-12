import React from 'react'

import { BlogIndexLayout } from './styles'
import PostExcerpt from '../PostExcerpt'
import CategoryList from '../CategoryList'

const PostList = ({ posts, categories, activeCategory }) => (
  <BlogIndexLayout>
    <div>
      {posts.edges.map(({ node: post }) => (
        <PostExcerpt key={post.slug} post={post} />
      ))}
    </div>
    <CategoryList
      title="Kategorien"
      categories={categories.edges}
      activeCategory={activeCategory && activeCategory.slug || ``}
    />
  </BlogIndexLayout>
)

export default PostList