import React from 'react'
import { CalendarDay } from 'styled-icons/fa-solid/CalendarDay'
import { Link } from 'styled-icons/boxicons-regular/Link'
import { Email } from 'styled-icons/material/Email'

import { PersonContainer, Details, Img, Remits, Name } from './styles'

const Person = ({ name, remits, photo, bio, email, homepage, dateJoined }) => (
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
      {(email || homepage) && (
        <address>
          {homepage && (
            <a href={homepage}>
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
