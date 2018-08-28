import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { Container, Icons } from './styles'

const Social = ({ social, iconSize, css }) => (
  <Container>
    {Object.keys(social).map(service => {
      const Icon = Icons[service]
      return (
        <a href={social[service]}>
          <Icon key={service} size={iconSize} css={css} />
        </a>
      )
    })}
  </Container>
)

export default props => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => <Social social={data.social.data} {...props} />}
  />
)

Social.propTypes = {
  social: PropTypes.shape({
    data: PropTypes.object.isRequired,
  }).isRequired,
  iconSize: PropTypes.string.isRequired,
}

Social.defaultProps = {
  iconSize: `1em`,
}
