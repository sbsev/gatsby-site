import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { SocialDiv, Container, Toggle, Icons } from './styles'

export default function Social({ collapse, services, ...rest }) {
  const { social } = useStaticQuery(graphql`
    {
      social: contentfulJson(title: { eq: "Social" }) {
        data {
          Facebook
          Github
          Linkedin
          Youtube
          Instagram
        }
      }
    }
  `)
  delete social.data.id
  return (
    <SocialDiv {...rest}>
      {collapse && <Toggle />}
      <Container collapse={collapse}>
        {Object.entries(social.data).map(([service, url]) => {
          if (services && !services.includes(service)) return
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
