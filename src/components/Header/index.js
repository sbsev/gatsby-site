import React from 'react'
import Headroom from 'react-headroom'

import Nav from '../Nav'
import Social from '../Social'
import { navLinkStyle } from '../Nav/styles'
import Search from '../Search'
import { HeaderContainer, Logo, SiteTitle } from './styles'

const searchIndices = [
  { name: `Pages`, title: `Seiten`, hitComp: `PageHit` },
  { name: `Posts`, title: `Blog`, hitComp: `PostHit` },
]

const Header = ({ site }) => (
  <Headroom>
    <HeaderContainer>
      <SiteTitle to="/" title={site.title} rel="home">
        <Logo />
        {site.title}
      </SiteTitle>
      <Nav />
      <Social short collapse iconCss={navLinkStyle} />
      <Search collapse indices={searchIndices} />
    </HeaderContainer>
  </Headroom>
)

export default Header
