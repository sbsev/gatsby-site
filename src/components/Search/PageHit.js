import React from 'react'
import { Highlight } from 'react-instantsearch-dom'
import { Link } from 'gatsby'

const PageHit = ({ hit }) => (
  <div>
    <Link to={hit.slug}>
      <h3>
        <Highlight attribute="title" hit={hit} />
      </h3>
    </Link>
    <Highlight attribute="excerpt" hit={hit} />
  </div>
)

export default PageHit
