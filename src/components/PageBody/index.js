import React from 'react'

import { Body, Updated } from './styles'

const PageBody = ({ children, mainChildren, html, updatedAt }) => (
  <Body>
    {children}
    <main>
      {mainChildren}
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {updatedAt && <Updated>Zuletzt bearbeitet: {updatedAt}</Updated>}
    </main>
  </Body>
)

export default PageBody
