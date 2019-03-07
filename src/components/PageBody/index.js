import React from "react"

import { BodyContainer, Updated } from "./styles"

const PageBody = ({ children, html, updated }) => (
  <BodyContainer>
    {children}
    <div dangerouslySetInnerHTML={{ __html: html }} />
    {updated && <Updated>Zuletzt bearbeitet: {updated}</Updated>}
  </BodyContainer>
)

export default PageBody
