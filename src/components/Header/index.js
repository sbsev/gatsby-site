import React from 'react'
import Headroom from 'react-headroom'

import { Container, Logo, SiteTitle } from './styles'
import Nav from '../Nav'
import Social from '../Social'
import { navLinkStyle } from '../Nav/styles'

const Header = ({ site }) => (
  <Headroom>
    <Container>
      <SiteTitle to="/" title={site.title} rel="home">
        <Logo />
        {site.title}
      </SiteTitle>
      <Nav />
      <Social expandOnHover iconCss={navLinkStyle} />
    </Container>
  </Headroom>
)

export default Header
