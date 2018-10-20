import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

export default connectSearchBox(
  ({ currentRefinement, refine, onFocus, className }) => (
    <input
      type="text"
      placeholder="Suche"
      aria-label="Suche"
      value={currentRefinement}
      onChange={e => refine(e.target.value)}
      onFocus={onFocus}
      className={className}
    />
  )
)
