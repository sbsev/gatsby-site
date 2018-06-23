import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import {
  FooterDiv,
  Copyright,
  FooterLinks,
  FooterLink,
  Source,
  PoweredBy,
} from './styles'
import Social from '../Social'
import { navLinkStyle } from '../Nav/styles'

const Footer = ({ copyright, source, links, poweredBy, logos }) => (
  <FooterDiv>
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
    <Source dangerouslySetInnerHTML={{ __html: source }} />
    <PoweredBy>
      Powered by:{' '}
      {poweredBy.map(({ url, title }, index) => (
        <a key={title} href={url}>
          <img src={logos.edges[index].node.file.url} alt={title} />
        </a>
      ))}
    </PoweredBy>
  </FooterDiv>
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
        source
        links {
          url
          title
        }
        poweredBy {
          url
          title
        }
      }
    }
    logos: allContentfulAsset(
      filter: { title: { regex: "/Footer logo/" } }
      sort: { fields: title }
    ) {
      edges {
        node {
          title
          file {
            url
          }
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={query}
    render={data => (
      <Footer {...data.footer.data} logos={data.logos} {...props} />
    )}
  />
)
