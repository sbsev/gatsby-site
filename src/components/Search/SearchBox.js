import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

import { Loupe } from './styles'

export default connectSearchBox(({ refine, onFocus, className }) => (
  <form className={className}>
    <input
      type="text"
      placeholder="Suche"
      aria-label="Suche"
      onChange={e => refine(e.target.value)}
      onFocus={onFocus}
    />
    <Loupe />
  </form>
))
