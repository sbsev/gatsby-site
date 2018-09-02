import React from 'react'
import _ from 'lodash'

import { Container } from './styles'

const PageMeta = ({ created, updated, authors }) => {
  authors = _.uniqWith(authors, _.isEqual)
  return (
    <Container>
      Erstellt: {created}
      {created !== updated && (
        <span> &bull; Zuletzt bearbeitet: {updated}</span>
      )}
      {authors.length && (
        <span>
          {' '}
          &bull; Autor
          {authors.length > 1 && `en`}:{' '}
          {authors
            .map(author => (
              <a key={author.name} href={`mailto:` + author.email}>
                {author.name}
              </a>
            ))
            .reduce((prev, curr) => [prev, `, `, curr])}
        </span>
      )}
    </Container>
  )
}

export default PageMeta
