import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import { NavContainer, NavEntry, SubNav, NavLink } from './styles'

const Nav = ({ nav }) => (
  <NavContainer role="navigation">
    {nav.map(item => (
      <NavEntry key={item.url}>
        <NavLink
          activeClassName="active"
          to={item.url}
          title={item.title}
          {...item.props}
        >
          {item.title} {item.subNav && <span>&#9662;</span>}
        </NavLink>
        {item.subNav && (
          <SubNav>
            {item.subNav.map(subItem => (
              <NavLink
                key={subItem.url}
                to={item.url + subItem.url}
                title={subItem.title}
                {...subItem.props}
              >
                {subItem.title}
              </NavLink>
            ))}
          </SubNav>
        )}
      </NavEntry>
    ))}
  </NavContainer>
)

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
        })
      ),
    })
  ).isRequired,
}
