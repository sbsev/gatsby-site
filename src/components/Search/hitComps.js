import React, { Fragment } from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"
import { Calendar } from "styled-icons/octicons/Calendar"
import { Tags } from "styled-icons/fa-solid/Tags"
import { FileDirectory } from "styled-icons/octicons/FileDirectory"
import { FileSubmodule } from "styled-icons/octicons/FileSubmodule"

export const PageHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={`/` + hit.slug} onClick={clickHandler}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

export const PostHit = clickHandler => ({ hit }) => (
  <div>
    <Link to={`/blog` + hit.slug} onClick={clickHandler}>
      <h4>
        <Highlight attribute="title" hit={hit} tagName="mark" />
      </h4>
    </Link>
    <div>
      <Calendar size="1em" />
      &nbsp;
      <Highlight attribute="date" hit={hit} tagName="mark" />
      &emsp;
      <Tags size="1em" />
      &nbsp;
      {hit.tags.map((tag, index) => (
        <Fragment key={tag}>
          {index > 0 && `, `}
          {tag.title}
        </Fragment>
      ))}
    </div>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)

export const ArticleHit = clickHandler => ({ hit }) => (
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
        <>
          &emsp;
          <FileSubmodule size="1em" />
          {` `}
          <Link to={`/wiki/${hit.section.slug}/${hit.subsection.slug}`}>
            {hit.subsection.title}
          </Link>
        </>
      )}
    </div>
    <Snippet attribute="excerpt" hit={hit} tagName="mark" />
  </div>
)
