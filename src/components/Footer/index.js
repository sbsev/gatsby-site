import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { Container, Copyright, FooterLinks, FooterLink } from './styles'
import Social from '../Social'
import { navLinkStyle } from '../Nav/styles'

const Footer = ({ footer }) => (
  <Container>
    <Copyright>
      © {new Date().getFullYear()} - {footer.copyright}
    </Copyright>
    <FooterLinks>
      {footer.links.map(link => (
        <FooterLink css={navLinkStyle} key={link.url} to={link.url}>
          {link.title}
        </FooterLink>
      ))}
    </FooterLinks>
    <Social iconCss={navLinkStyle} />
  </Container>
)

export default props => (
  <StaticQuery
    query={graphql`
      {
        footer: contentfulJson(title: { eq: "Footer" }) {
          data {
            copyright
            links {
              url
              title
            }
          }
        }
      }
    `}
    render={data => <Footer footer={data.footer.data} {...props} />}
  />
)

Footer.propTypes = {
  footer: PropTypes.shape({
    copyright: PropTypes.string.isRequired,
    links: PropTypes.array.isRequired,
  }).isRequired,
}
