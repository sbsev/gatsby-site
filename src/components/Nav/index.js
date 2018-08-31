import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Nav from './comp'

export default props => (
  <StaticQuery
    query={graphql`
      {
        nav: contentfulJson(title: { eq: "Nav" }) {
          data {
            nav {
              url
              title
              subNav {
                url
                title
                span
              }
            }
          }
        }
      }
    `}
    render={data => <Nav nav={data.nav.data.nav} {...props} />}
  />
)

Nav.propTypes = {
  nav: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subNav: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          span: PropTypes.bool,
        })
      ),
    })
  ).isRequired,
}
