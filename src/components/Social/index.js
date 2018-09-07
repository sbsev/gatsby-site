import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { Wrapper, Container, Toggle, Icons } from './styles'

const Social = ({ social, iconSize, containerCss, iconCss, expandOnHover }) => (
  <Wrapper>
    {expandOnHover && <Toggle size={iconSize} css={iconCss} />}
    <Container {...{ expandOnHover }} css={containerCss}>
      {Object.keys(social).map(service => {
        const Icon = Icons[service]
        return (
          <a key={service} href={social[service]}>
            <Icon key={service} size={iconSize} css={iconCss} />
          </a>
        )
      })}
    </Container>
  </Wrapper>
)

const query = graphql`
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
`

export default props => (
  <StaticQuery
    query={query}
    render={data => <Social social={data.social.data} {...props} />}
  />
)

Social.propTypes = {
  social: PropTypes.object.isRequired,
  iconSize: PropTypes.string.isRequired,
}

Social.defaultProps = {
  iconSize: `1em`,
}
