import React from 'react'
import { Highlight } from 'react-instantsearch-dom'
import { Link } from 'gatsby'
import { UserEdit } from 'styled-icons/fa-solid/UserEdit'
import { Calendar } from 'styled-icons/octicons/Calendar'
import { Tags } from 'styled-icons/fa-solid/Tags'

const PostHit = ({ hit }) => (
  <div>
    <Link to={`/blog/` + hit.slug}>
      <h3>
        <Highlight attribute="title" hit={hit} />
      </h3>
    </Link>
    <p>
      <UserEdit size="1em" />
      &nbsp;
      <a href={`mailto:` + hit.author.email}>
        <Highlight attribute="author.name" hit={hit} />
      </a>
      &emsp;
      <Calendar size="1em" />
      &nbsp;
      <Highlight attribute="date" hit={hit} />
      &emsp;
      <Tags size="1em" />
      &nbsp;
      {hit.categories.map(({ title, slug }) => (
        <Link to={`/blog/` + slug}>{title}</Link>
      ))}
    </p>
    <Highlight attribute="excerpt" hit={hit} />
  </div>
)

export default PostHit
