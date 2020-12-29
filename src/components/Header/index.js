import React from 'react'
import { Link } from 'gatsby'

import Nav from '../Nav'
import Social from '../Social'
import Search from '../Search'
import { HeaderContainer, Logo } from './styles'

const searchIndices = [{ name: `Seiten` }, { name: `Posts`, type: `postHit` }]

const Header = ({ site }) => (
  <HeaderContainer>
    <Link to="/" title={site.title} rel="home" css="grid-area: title;">
      <Logo alt={site.title} css="vertical-align: bottom;" />
    </Link>
    <Nav />
    <Social collapse Instagram Facebook Linkedin />
    <Search collapse indices={searchIndices} />
  </HeaderContainer>
)

export default Header
