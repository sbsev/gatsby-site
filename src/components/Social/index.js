import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { Wrapper, Container, Toggle, Icons } from './styles'

const Social = ({ social, size = `1em`, iconCss, collapse, short }) => (
  <Wrapper>
    {collapse && <Toggle size={size} css={iconCss} />}
    <Container {...{ collapse }}>
      {Object.keys(social).map(service => {
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

const query = graphql`
  {
    social: contentfulJson(title: { eq: "Social" }) {
      social: data {
        Email
        Facebook
        Github
        Linkedin
        Youtube
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={query}
    render={data => <Social {...data.social} {...props} />}
  />
)

Social.propTypes = {
  social: PropTypes.object.isRequired,
  size: PropTypes.string,
}
