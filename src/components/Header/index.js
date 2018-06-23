import React from 'react'
import Headroom from 'react-headroom'

import Nav from '../Nav'
import Social from '../Social'
import { navLinkStyle } from '../Nav/styles'
import Search from '../Search'
import { Container, Logo, SiteTitle, SocialSearch } from './styles'

const Header = ({ site }) => (
  <Headroom>
    <Container>
      <SiteTitle to="/" title={site.title} rel="home">
        <Logo />
        {site.title}
      </SiteTitle>
      <Nav />
      <SocialSearch>
        <Social short collapse iconCss={navLinkStyle} />
        <Search />
      </SocialSearch>
    </Container>
  </Headroom>
)

export default Header
