import React from 'react'
import Helmet from 'react-helmet'

import PostExcerpt from './PostExcerpt'
import BlogIndexLayout from './BlogIndexLayout'
import CategoryList from './CategoryList'

const PostList = ({ site, posts, categories, activeCategory }) => (
  <BlogIndexLayout>
    <Helmet title={site.meta.title} />
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