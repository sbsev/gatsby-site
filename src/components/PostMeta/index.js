import React from 'react'

import { UserEdit } from 'styled-icons/fa-solid/UserEdit'
import { Email } from 'styled-icons/material/Email'
import { Link } from 'styled-icons/boxicons-regular/Link'
import { Calendar } from 'styled-icons/octicons/Calendar'
import { Timer } from 'styled-icons/material/Timer'

import { Meta, AuthorPhoto } from './styles'

export default function PostExcerpt({ timeToRead, author, date, inTitle }) {
  return (
    <Meta inTitle={inTitle}>
      <AuthorPhoto fluid={author.photo.fluid} alt={author.name} />
      <div>
        <UserEdit size="1em" /> &nbsp;{author.name}
        {author.homepage && (
          <>
            &nbsp;
            <a href={author.homepage}>
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
