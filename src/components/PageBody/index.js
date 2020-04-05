import React from 'react'

import { Main, Content, Updated, Address } from './styles'

export default function PageBody(props) {
  const { children, html, updatedAt, title } = props
  const mailto = `mailto:it@studenten-bilden-schueler.de?subject=Feedback zu Seite "${title}"`
  return (
    <Main>
      {children}
      <Content dangerouslySetInnerHTML={{ __html: html }} />
      {updatedAt && <Updated>Zuletzt bearbeitet: {updatedAt}</Updated>}
      {title && (
        <Address>
          <a href={mailto}>War diese Seite hilfreich?</a>
        </Address>
      )}
    </Main>
  )
}
