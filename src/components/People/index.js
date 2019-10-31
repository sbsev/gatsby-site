import React from 'react'

import Person from '../Person'
import { Wrapper } from './styles'

const People = ({ people }) => (
  <Wrapper>
    {people.map(person => (
      <Person key={person.name} {...person} />
    ))}
  </Wrapper>
)

export default People
