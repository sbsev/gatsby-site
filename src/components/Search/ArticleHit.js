import React, { Fragment } from 'react'
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
      <Link to={`/wiki/` + hit.section.slug}>{hit.section.title}</Link>
      {hit.subsection && (
        <Fragment>
          &emsp;
          <FileSubmodule size="1em" />
          {` `}
          <Link to={`/wiki/${hit.section.slug}/${hit.subsection.slug}`}>
            {hit.subsection.title}
          </Link>
        </Fragment>
      )}
    </div>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

export default ArticleHit
