import React from 'react'
import { Layout, Title } from './styles'

const PageTitle = props => (
  <Layout>
    <Title>{props.title}</Title>
  </Layout>
)

export default PageTitle
