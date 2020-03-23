import React from 'react'
import { Link } from 'gatsby'

import Nav from '../Nav'
import Social from '../Social'
import Search from '../Search'
import { HeaderContainer, Logo } from './styles'

const searchIndices = [
  { name: `Pages`, title: `Seiten` },
  { name: `Posts`, title: `Blog`, type: `postHit` },
]

const Header = ({ site }) => (
  <HeaderContainer>
    <Link to="/" title={site.title} rel="home" css="grid-area: title;">
      <Logo alt={site.title} css="vertical-align: bottom;" />
    </Link>
    <Nav />
    <Social collapse Contacts Facebook Linkedin Instagram />
    <Search collapse indices={searchIndices} />
  </HeaderContainer>
)

export default Header
