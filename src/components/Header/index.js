import React from 'react'
import {
  Background,
  Content,
  Logo,
  SiteTitle,
  Nav,
  NavLink,
  SubNavLink,
  NavIcons,
  NavIcon,
} from './styles'
import logo from '../../assets/logo.svg'
import { FacebookIcon, EmailIcon } from '../Icons'

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
          <React.Fragment key={item.url}>
            <NavLink to={item.url} title={item.title} {...item.props}>
              {item.title}
            </NavLink>
            <div>
              {item.subNav && item.subNav.map(subItem => (
                <SubNavLink key={subItem.url} to={subItem.url} title={subItem.title} {...subItem.props}>
                  {subItem.title}
                </SubNavLink>
              ))}
            </div>
          </React.Fragment>
        ))}
      </Nav>
      <NavIcons>
        <NavIcon href={header.facebook}>
          <FacebookIcon title="Facebook" size="1.1rem" />
        </NavIcon>
        <NavIcon href={header.email}>
          <EmailIcon title="Email" size="1.5rem" />
        </NavIcon>
      </NavIcons>
    </Content>
  </Background>
)

export default Header
