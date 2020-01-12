import { Link } from 'gatsby'
import React, { Fragment } from 'react'
import { Highlight, Snippet } from 'react-instantsearch-dom'
import { Tags, UserEdit } from 'styled-icons/fa-solid'
import { Calendar } from 'styled-icons/octicons'
import { connectHits } from 'react-instantsearch-dom'

const postHit = hit => (
  <div css="margin: 0.6em 0;">
    <UserEdit size="1em" />
    &nbsp;
    <a href={`mailto:` + hit.author.email}>
      <Highlight attribute="author.name" hit={hit} tagName="mark" />
    </a>
    &emsp;
    <Calendar size="1em" />
    &nbsp;
    <Highlight attribute="date" hit={hit} tagName="mark" />
    &emsp;
    <Tags size="1em" />
    &nbsp;
    {hit.tags.map((tag, index) => (
      <Fragment key={tag.slug}>
        {index > 0 && `, `}
        {tag.title}
      </Fragment>
    ))}
  </div>
)

export default connectHits(function HitComp({ type, hits, onClick }) {
  const extend = { postHit }[type]
  return hits.map(hit => (
    <div key={hit.objectID}>
      <Link to={hit.slug} onClick={onClick}>
        <h3>
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </h3>
      </Link>
      {extend && extend(hit)}
      <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
  ))
})
