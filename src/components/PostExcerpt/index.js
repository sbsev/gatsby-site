import React from 'react'

import { Title, TitleLink, Meta, Tags, Tag, FeaturedImage } from './styles'
import { DateIcon, TimeIcon } from '../Icons'

const PostExcerpt = ({ post }) => (
  <article>
    {post.featuredImage && (
      <FeaturedImage
        src={post.featuredImage.file.url}
        alt={post.featuredImage.title}
      />
    )}
    <Title>
      <TitleLink to={'/blog/' + post.slug}>{post.title.title}</TitleLink>
    </Title>
    <Meta>
      <DateIcon /> {post.date} | <TimeIcon /> {post.body.data.timeToRead} Min
      Lesezeit
    </Meta>
    <p dangerouslySetInnerHTML={{ __html: post.body.data.excerpt }} />
    <Tags>
      Tags:{' '}
      {post.tags.map(tag => (
        <Tag>{tag}</Tag>
      ))}
    </Tags>
  </article>
)

export default PostExcerpt
