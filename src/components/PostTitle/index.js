import React from 'react'

import {
  Container,
  FeaturedImage,
  Title,
  Author,
  Meta,
  UserEdit,
  AuthorPage,
  Email,
  Date,
  Timer,
} from './styles'

const PostTitle = ({ post }) => {
  const { featuredImage, title, author, date, body } = post
  return (
    <Container>
      {featuredImage && (
        <FeaturedImage src={featuredImage.file.url} alt={featuredImage.title} />
      )}
      <Title>{title.title}</Title>
      <Author>
        <img src={author.profilePhoto.fixed.src} alt={author.name} />
        <div>
          <UserEdit size="1em" /> &nbsp; {author.name} &nbsp;
          {author.homepage && (
            <a href={author.homepage}>
              <AuthorPage size="1em" />
            </a>
          )}
          &nbsp;
          {author.email && (
            <a href={`mailto:${author.email}`}>
              <Email size="1em" />
            </a>
          )}
        </div>
      </Author>
      <Meta>
        <Date size="1em" /> &nbsp; {date} &nbsp; | &nbsp; <Timer size="1em" />{' '}
        &nbsp; {body.data.timeToRead} Min Lesezeit
      </Meta>
    </Container>
  )
}

export default PostTitle
