import React from 'react'
import {
  Background,
  Content,
  FooterLinks,
  FooterLink,
} from './styles'

const Footer = ({ footer }) => (
  <Background>
    <Content>
      {footer.copyright}
      <FooterLinks>
        {footer.links.map(link =>
          <FooterLink key={link.url} to={link.url}>
            {link.title}
          </FooterLink>
        )}
      </FooterLinks>
    </Content>
  </Background>
)

export default Footer