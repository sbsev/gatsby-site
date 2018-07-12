import React from 'react'
import _ from 'lodash'

import { Layout, Content } from './styles'

const PageMeta = ({ created, updated, authors }) => {
  authors = _.uniqWith(authors, _.isEqual)
  return <Layout>
    <Content>
      Erstellt: {created} &bull;{` `}
      {created !== updated && <span>Zuletzt bearbeitet: {updated} &bull; </span>}
      {authors.length &&
        <span>Autor{authors.length > 1 ? `en` : ``}: {
          authors.map(author =>
            <a key={author.name} href={`mailto:` + author.email}>
              {author.name}
            </a>
          ).reduce((prev, curr) => [prev, `, `, curr])
        }
        </span>
      }
    </Content>
  </Layout>
}

export default PageMeta
