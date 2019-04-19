import React from "react"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

import Link from "../Link"
import { FooterContainer, FooterLinks, Source, PoweredBy } from "./styles"
import Social from "../Social"
import { navLinkStyle } from "../Nav"

const Footer = ({ copyright, source, links, poweredBy, logos }) => (
  <FooterContainer>
    <div>
      © {new Date().getFullYear()} - {copyright}
    </div>
    <FooterLinks>
      {links.map(link => (
        <Link css={navLinkStyle} key={link.url} to={link.url}>
          {link.title}
        </Link>
      ))}
    </FooterLinks>
    <Social iconCss={navLinkStyle} />
    <Source dangerouslySetInnerHTML={{ __html: source }} />
    <PoweredBy>
      Powered by:{` `}
      {poweredBy.map(({ url, title }, index) => (
        <a key={title} href={url}>
          <img src={logos[index].node.file.url} alt={title} />
        </a>
      ))}
    </PoweredBy>
  </FooterContainer>
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
      logos: edges {
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
    render={({ footer, logos }) => (
      <Footer {...footer.data} {...logos} {...props} />
    )}
  />
)
