import React from 'react'

import { Container, Logo, SiteTitle } from './styles'
import Nav from '../Nav'
import Social from '../Social'
import { navLinkStyle } from '../Nav/styles'

const Header = ({ site }) => (
  <Container>
    <SiteTitle to="/" title={site.title} rel="home" styles={navLinkStyle}>
      <Logo />
      {site.title}
    </SiteTitle>
    <Nav />
    <Social css={navLinkStyle} />
  </Container>
)

export default Header
