import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Container, NavEntry, SubNav, NavLink, Toggle } from './styles'

const events = ['mousedown', 'touchstart']

class Nav extends React.Component {
  static propTypes = {
    nav: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          title: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
        }),
      })
    ),
  }
  state = { showNav: false }

  toggleNav = () => {
    this.setState({ showNav: !this.state.showNav })
  }

  handleClickOutside = event => {
    if (this.node && !this.node.contains(event.target) && this.state.showNav) {
      this.toggleNav()
    }
  }

  handleScroll = () => {
    if (this.state.showNav) {
      this.toggleNav()
    }
  }

  componentDidMount() {
    events.forEach(event =>
      document.addEventListener(event, this.handleClickOutside)
    )
    document.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    events.forEach(event =>
      document.removeEventListener(event, this.handleClickOutside)
    )
  }

  render() {
    const { nav, css } = this.props
    return (
      <Fragment>
        <Toggle onClick={this.toggleNav}>&#9776;</Toggle>
        <Container
          role="navigation"
          css={css}
          innerRef={node => (this.node = node)}
          showNav={this.state.showNav}
        >
          <Toggle inside onClick={this.toggleNav}>
            &times;
          </Toggle>
          {nav.map(item => (
            <NavEntry key={item.url}>
              <NavLink
                activeClassName="active"
                to={item.url}
                title={item.title}
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
                      span={subItem.span}
                      onClick={this.toggleNav}
                    >
                      {subItem.title}
                    </NavLink>
                  ))}
                </SubNav>
              )}
            </NavEntry>
          ))}
        </Container>
      </Fragment>
    )
  }
}

export default Nav
