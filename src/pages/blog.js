import React, { useState } from 'react'
import { graphql } from 'gatsby'

import PageTitle from 'components/PageTitle'
import PageBody from 'components/PageBody'
import TagList from 'components/TagList'
import PostList from 'components/PostList'

const filterPostsByTag = (tag, posts) =>
  tag === `alle`
    ? posts
    : posts.filter(post => post.tags.map(tag => tag.title).includes(tag))

const readActiveTagFromUrl = urlParams => urlParams.replace(/.*tag=([^&]+).*/, `$1`)

export default function BlogPage({ data, location }) {
  const { posts, tags, cover } = data
  const urlTag = readActiveTagFromUrl(location.search)
  const [tag, setTag] = useState(urlTag || `alle`)
  const filteredPosts = filterPostsByTag(tag, posts.nodes)

  const handleTagClick = tag => {
    setTag(tag)
    history.replaceState(
      { activeTag: tag },
      `active tag: ${tag}`,
      tag === `alle` ? `/blog` : `/blog?tag=${tag}`
    )
  }
  return (
    <>
      <PageTitle cover={cover}>
        <h1>Blog</h1>
      </PageTitle>
      <PageBody>
        <TagList tags={tags.nodes} activeTag={tag} setTag={handleTagClick} />
        <PostList posts={filteredPosts} />
      </PageBody>
    </>
  )
}

export const query = graphql`
  {
    posts: allContentfulPost(
      filter: { node_locale: { eq: "de" } }
      sort: { fields: [date], order: DESC }
    ) {
      nodes {
        ...postFields
      }
    }
    tags: allContentfulBlogTag(
      filter: { node_locale: { eq: "de" } }
      sort: { fields: [title], order: ASC }
    ) {
      nodes {
        title
        icon {
          title
          file {
            url
          }
        }
      }
    }
    cover: contentfulAsset(title: { eq: "Blog Banner" }) {
      ...image
    }
  }
`
