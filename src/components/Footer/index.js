import { graphql, useStaticQuery, Link } from 'gatsby'
import React from 'react'
import Social from '../Social'
import { FooterDiv, FooterLinks, PoweredBy, Source } from './styles'

export default function Footer() {
  const { footer } = useStaticQuery(graphql`
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
        files {
          file {
            url
          }
        }
      }
    }
  `)
  const { copyright, source, links, poweredBy } = footer.data
  return (
    <FooterDiv>
      <div>
        © {new Date().getFullYear()} - {copyright}
      </div>
      <FooterLinks>
        {links.map(link => (
          <Link key={link.url} to={link.url}>
            {link.title}
          </Link>
        ))}
      </FooterLinks>
      <Social Facebook Instagram Youtube Linkedin Xing Twitter />
      <Source dangerouslySetInnerHTML={{ __html: source }} />
      <PoweredBy>
        Powered by:{` `}
        {poweredBy.map(({ url, title }, index) => (
          <a key={title} href={url}>
            <img src={footer.files[index].file.url} alt={title} />
          </a>
        ))}
      </PoweredBy>
    </FooterDiv>
  )
}
