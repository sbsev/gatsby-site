import React from 'react'
import { CalendarDay } from 'styled-icons/fa-solid'
import { Link } from 'styled-icons/boxicons-regular'
import { Email } from 'styled-icons/material'

import { PersonContainer, Details, Img, Remits, Name } from './styles'

const Person = ({ name, remits, photo, bio, email, url, dateJoined }) => (
  <PersonContainer>
    <Img fluid={photo.fluid} />
    <Name>{name}</Name>
    <Remits>{remits.map(remit => remit.title).join(`, `)}</Remits>
    <Details>
      {dateJoined && (
        <span>
          <CalendarDay size="1em" />
          &nbsp;Seit {dateJoined} dabei
        </span>
      )}
      {(email || url) && (
        <address>
          {url && (
            <a href={url}>
              <Link size="1em" />
              &nbsp;Homepage
            </a>
          )}
          {email && (
            <a href={`mailto:${email}`}>
              <Email size="1em" />
              &nbsp;Email
            </a>
          )}
        </address>
      )}
      {bio && <span dangerouslySetInnerHTML={{ __html: bio.remark.html }} />}
    </Details>
  </PersonContainer>
)

export default Person
