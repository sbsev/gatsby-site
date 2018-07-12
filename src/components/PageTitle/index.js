import React from 'react'

import { Layout, Title } from './styles'

const PageTitle = props => (
  <Layout>
    <Title>{props.text}</Title>
  </Layout>
)

export default PageTitle
