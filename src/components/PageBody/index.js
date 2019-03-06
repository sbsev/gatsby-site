import React from "react"

import { BodyContainer, Updated } from "./styles"

const PageBody = ({ children, html, updated }) => (
  <>
    {children}
    <BodyContainer dangerouslySetInnerHTML={{ __html: html }} />
    {updated && <Updated>Zuletzt bearbeitet: {updated}</Updated>}
  </>
)

export default PageBody
