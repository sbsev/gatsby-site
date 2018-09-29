import React from 'react'
import Headroom from 'react-headroom'

import { Container, Logo, SiteTitle } from './styles'
import Nav from '../Nav'
import Social from '../Social'
import { navLinkStyle } from '../Nav/styles'
import Search from '../Search';

const Header = ({ site }) => (
  <Headroom>
    <Container>
      <SiteTitle to="/" title={site.title} rel="home">
        <Logo />
        {site.title}
      </SiteTitle>
      <Nav />
      <Social short collapse iconCss={navLinkStyle} />
      <Search />
    </Container>
  </Headroom>
)

export default Header
