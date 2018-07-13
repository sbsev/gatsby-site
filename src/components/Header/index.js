import React from 'react'

import {
  Background,
  Content,
  Logo,
  SiteTitle,
  Nav,
  NavEntry,
  SubNav,
  NavLink,
  NavIcons,
  NavIcon,
} from './styles'
import logo from '../../assets/logo.svg'
import { EmailIcon, FacebookIcon, GitHubIcon, LinkedinIcon } from '../Icons'

const Header = ({ meta, header }) => (
  <Background>
    <Content>
      <Logo>
        <img src={logo} alt="Logo"/>
      </Logo>
      <SiteTitle to="/" title={meta.title} rel="home">
        {meta.title}
      </SiteTitle>
      <Nav role="navigation">
        {header.nav.map(item => (
          <NavEntry key={item.url}>
            <NavLink activeClassName to={item.url} title={item.title} {...item.props}>
              {item.title}
            </NavLink>
            {item.subNav && <SubNav>
              {item.subNav.map(subItem => (
                <NavLink hoverblue="true" key={subItem.url} to={item.url + subItem.url} title={subItem.title} {...subItem.props}>
                  {subItem.title}
                </NavLink>
              ))}
            </SubNav>}
          </NavEntry>
        ))}
      </Nav>
      <NavIcons>
        <NavIcon href={header.social.email}>
          <EmailIcon title="Email" size="1.27rem" />
        </NavIcon>
        <NavIcon href={header.social.facebook}>
          <FacebookIcon title="Facebook" />
        </NavIcon>
        <NavIcon href={header.social.github}>
          <GitHubIcon title="GitHub" />
        </NavIcon>
        <NavIcon href={header.social.linkedin}>
          <LinkedinIcon title="Linkedin" />
        </NavIcon>
      </NavIcons>
    </Content>
  </Background>
)

export default Header
