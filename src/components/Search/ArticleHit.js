import React from 'react'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import { Link } from 'gatsby'
import { FileDirectory } from 'styled-icons/octicons/FileDirectory'
import { FileSubmodule } from 'styled-icons/octicons/FileSubmodule'

const ArticleHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={hit.slug} onClick={clickHandler}>
      <h3>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h3>
    </Link>
    <div>
      <FileDirectory size="1em" />
      {` `}
      <Link to={hit.section.slug}>{hit.section.title}</Link>
      &emsp;
      <FileSubmodule size="1em" />
      {` `}
      <Link to={hit.subsection.slug}>{hit.subsection.title}</Link>
    </div>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

export default ArticleHit
