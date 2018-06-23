import React from 'react'
import { Layout, Title, Meta } from './styles'
import { DateIcon, TimeIcon } from '../Icons'

const PostTitle = props => (
  <Layout>
    <Title>{props.title}</Title>
    <Meta>
      <DateIcon /> {props.date} | <TimeIcon /> {props.timeToRead} Minute Read
    </Meta>
  </Layout>
)

export default PostTitle
