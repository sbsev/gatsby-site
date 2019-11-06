import React from 'react'
import Headroom from 'react-headroom'

import Nav from '../Nav'
import Social from '../Social'
import { navLinkStyle } from '../Nav'
import Search from '../Search'
import { HeaderContainer, Logo, SiteTitle } from './styles'

const searchIndices = [
  { name: `Pages`, title: `Seiten` },
  { name: `Posts`, title: `Blog`, type: `postHit` },
]

const Header = ({ site }) => (
  <Headroom css="z-index: 3;">
    <HeaderContainer>
      <SiteTitle to="/" title={site.title} rel="home">
        <Logo alt={site.title} />
        {site.title}
      </SiteTitle>
      <Nav />
      <Social short collapse iconCss={navLinkStyle} />
      <Search collapse indices={searchIndices} iconCss={navLinkStyle} />
    </HeaderContainer>
  </Headroom>
)

export default Header
