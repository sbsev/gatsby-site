import React from 'react'

import { Body, Updated, Address } from './styles'

export default function PageBody(props) {
  const { children, mainChildren, html, updatedAt, title } = props
  const mailto = `mailto:it@studenten-bilden-schueler.de?subject=Feedback zu Seite "${title}"`
  return (
    <Body>
      {children}
      <main>
        {mainChildren}
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {updatedAt && <Updated>Zuletzt bearbeitet: {updatedAt}</Updated>}
        {title && (
          <Address>
            <a href={mailto}>War diese Seite hilfreich?</a>
          </Address>
        )}
      </main>
    </Body>
  )
}
