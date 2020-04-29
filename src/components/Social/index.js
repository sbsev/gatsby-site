import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { SocialDiv, Container, Toggle, Icons } from './styles'

export default function Social({ collapse, className, ...display }) {
  const { social } = useStaticQuery(graphql`
    {
      social: contentfulJson(title: { eq: "Social" }) {
        data {
          Kontakt
          Instagram
          Facebook
          Github
          Youtube
          Linkedin
          Xing
        }
      }
    }
  `)
  delete social.data.id
  return (
    <SocialDiv className={className}>
      {collapse && <Toggle />}
      <Container collapse={collapse}>
        {Object.entries(social.data).map(([service, url]) => {
          if (!display[service]) return
          const Icon = Icons[service]
          return (
            <a key={service} href={url} title={service}>
              <Icon size="1.1em" />
            </a>
          )
        })}
      </Container>
    </SocialDiv>
  )
}
