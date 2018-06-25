import React from 'react'
import { Layout, Content } from './styles'

const PageMeta = props => (
  <Layout>
    <Content>
      Zuletzt bearbeitet: {props.updated}<br/>
      Autor{props.authors.length > 1 ? `en` : ``}: {props.authors.map(author => author.name).join(`, `)}
    </Content>
  </Layout>
)

export default PageMeta
