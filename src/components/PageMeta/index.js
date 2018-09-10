import React from 'react'

import { Meta } from './styles'

const PageMeta = ({ updated }) => {
  return <Meta>{updated && `Zuletzt bearbeitet: ${updated}`}</Meta>
}

export default PageMeta
