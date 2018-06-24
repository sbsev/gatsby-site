import React from 'react'
import { Container, Title, Meta } from './styles'
import { DateIcon, TimeIcon } from '../Icons'

const PostTitle = props => (
  <Container>
    <Title>{props.title}</Title>
    <Meta>
      <DateIcon /> {props.date} | <TimeIcon /> {props.timeToRead} Minute Read
    </Meta>
  </Container>
)

export default PostTitle
