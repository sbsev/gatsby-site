import React from 'react'
import { Container, FeaturedImage, Title, Meta } from './styles'
import { DateIcon, TimeIcon } from '../Icons'

const PostTitle = ({ featuredImage, title, date, timeToRead }) => (
  <Container>
    {featuredImage && (
      <FeaturedImage src={featuredImage.file.url} alt={featuredImage.title} />
    )}
    <Title>{title}</Title>
    <Meta>
      <DateIcon /> {date} | <TimeIcon /> {timeToRead} Min Lesezeit
    </Meta>
  </Container>
)

export default PostTitle
