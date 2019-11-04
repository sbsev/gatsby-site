import React, { useState } from 'react'
import { graphql } from 'gatsby'

import Global from 'components/Global'
import PageTitle from 'components/PageTitle'
import PageBody from 'components/PageBody'
import TagList from 'components/TagList'
import PostList from 'components/PostList'

const filterPostsByTag = (tag, posts) =>
  tag === `alle`
    ? posts
    : posts.filter(({ node }) => node.tags.map(tag => tag.title).includes(tag))

const readActiveTagFromUrl = urlParams => urlParams.replace(/.*tag=([^&]+).*/, `$1`)

export default function BlogPage({ data, location }) {
  const { posts, tags, cover } = data
  const urlTag = readActiveTagFromUrl(location.search)
  const [tag, setTag] = useState(urlTag || `alle`)
  const filteredPosts = filterPostsByTag(tag, posts.edges)

  const handleTagClick = tag => {
    setTag(tag)
    history.replaceState(
      { activeTag: tag },
      `active tag: ${tag}`,
      tag === `alle` ? `/blog` : `/blog?tag=${tag}`
    )
  }
  return (
    <Global pageTitle="Blog" path={location.pathname}>
      <PageTitle cover={cover}>
        <h1>Blog</h1>
      </PageTitle>
      <PageBody>
        <TagList tags={tags.edges} activeTag={tag} setTag={handleTagClick} />
        <PostList posts={filteredPosts} />
      </PageBody>
    </Global>
  )
}

export const query = graphql`
  {
    posts: allContentfulPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          ...postFields
        }
      }
    }
    tags: allContentfulBlogTag(sort: { fields: [title], order: ASC }) {
      edges {
        node {
          title
          icon {
            title
            file {
              url
            }
          }
        }
      }
    }
    cover: contentfulAsset(title: { eq: "Blog Banner" }) {
      ...image
    }
  }
`
