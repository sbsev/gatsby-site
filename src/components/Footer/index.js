import React from 'react'
import {
  Background,
  Content,
  FooterLink,
} from './styles'

const Footer = ({ footer }) => (
  <Background>
    <Content>
      {footer.copyright}
      {footer.links.map(link =>
        <FooterLink key={link.url} to={link.url}>
          {link.title}
        </FooterLink>
      )}
    </Content>
  </Background>
)

export default Footer