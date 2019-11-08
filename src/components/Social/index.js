import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { Wrapper, Container, Toggle, Icons } from './styles'

export default function Social({ size = `1em`, iconCss, collapse, short }) {
  const { social } = useStaticQuery(graphql`
    {
      social: contentfulJson(title: { eq: "Social" }) {
        data {
          Email
          Facebook
          Github
          Linkedin
          Youtube
        }
      }
    }
  `)
  return (
    <Wrapper>
      {collapse && <Toggle size={size} css={iconCss} />}
      <Container collapse={collapse}>
        {Object.keys(social.data).map(service => {
          if (short && [`Email`, `Github`].includes(service)) return undefined
          const Icon = Icons[service]
          return (
            <a key={service} href={social[service]} css={iconCss}>
              <Icon size={size} />
            </a>
          )
        })}
      </Container>
    </Wrapper>
  )
}
