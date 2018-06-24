import React from 'react'
import { Container, Title, Meta } from './styles'
import { DateIcon, TimeIcon } from '../Icons'

const PostTitle = props => (
  <Container>
    <Title>{props.title}</Title>
    <Meta>
      <DateIcon /> {props.date} | <TimeIcon /> {props.timeToRead} Min Lesezeit
    </Meta>
  </Container>
)

export default PostTitle
