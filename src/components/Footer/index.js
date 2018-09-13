import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { Container, Copyright, FooterLinks, FooterLink } from './styles'
import Social from '../Social'
import { navLinkStyle } from '../Nav/styles'

const Footer = ({ copyright, links }) => (
  <Container>
    <Copyright>
      © {new Date().getFullYear()} - {copyright}
    </Copyright>
    <FooterLinks>
      {links.map(link => (
        <FooterLink css={navLinkStyle} key={link.url} to={link.url}>
          {link.title}
        </FooterLink>
      ))}
    </FooterLinks>
    <Social iconCss={navLinkStyle} />
  </Container>
)

Footer.propTypes = {
  copyright: PropTypes.string.isRequired,
  links: PropTypes.array.isRequired,
}

const query = graphql`
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
`

export default props => (
  <StaticQuery
    query={query}
    render={data => <Footer {...data.footer.data} {...props} />}
  />
)
