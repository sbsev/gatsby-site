import React from 'react'

import {
  Title,
  TitleLink,
  Meta,
  Tags,
  Tag,
  FeaturedImage,
  UserEdit,
  AuthorPage,
  Email,
  Date,
  Timer,
} from './styles'

const PostExcerpt = ({ post }) => {
  const { featuredImage, slug, title, author, date, tags, body } = post
  const {
    data: { timeToRead, excerpt },
  } = body
  return (
    <article>
      {featuredImage && (
        <FeaturedImage src={featuredImage.file.url} alt={featuredImage.title} />
      )}
      <Title>
        <TitleLink to={'/blog/' + slug}>{title.title}</TitleLink>
      </Title>
      <Meta>
        <img src={author.profilePhoto.fixed.src} alt={author.name} />
        <span>
          <span>
            <UserEdit size="1em" /> &nbsp; {author.name}
          </span>
          {author.homepage && (
            <a href={author.homepage}>
              <AuthorPage size="1em" />
            </a>
          )}
          {author.email && (
            <a href={`mailto:${author.email}`}>
              <Email size="1em" />
            </a>
          )}
        </span>
        <span>
          <Date size="1em" /> &nbsp; {date} &nbsp; | &nbsp; <Timer size="1em" />{' '}
          &nbsp; {timeToRead} Min Lesezeit
        </span>
      </Meta>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />
      <Tags>
        Tags:{' '}
        {tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
    </article>
  )
}

export default PostExcerpt
