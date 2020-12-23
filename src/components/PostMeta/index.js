import React from 'react'

import { UserEdit } from 'styled-icons/fa-solid'
import { Email, Timer } from 'styled-icons/material'
import { Link } from 'styled-icons/boxicons-regular'
import { Calendar } from 'styled-icons/octicons'

import { Meta, AuthorPhoto } from './styles'

export default function PostExcerpt({ timeToRead, author, date, inTitle }) {
  return (
    <Meta inTitle={inTitle}>
      <AuthorPhoto fluid={author?.photo?.fluid} alt={author.name} />
      <div>
        <UserEdit size="1em" /> &nbsp;{author.name}
        {author.url && (
          <>
            &nbsp;
            <a href={author.url}>
              <Link size="1em" />
            </a>
          </>
        )}
        {author.email && (
          <>
            &nbsp;
            <a href={`mailto:${author.email}`}>
              <Email size="1em" />
            </a>
          </>
        )}
      </div>
      <div>
        <Calendar size="1em" /> &nbsp;{date}
      </div>
      <div>
        <Timer size="1em" /> &nbsp;{timeToRead} Min Lesezeit
      </div>
    </Meta>
  )
}
