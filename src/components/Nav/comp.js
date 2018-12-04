import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { NavContainer, NavEntry, SubNav, NavLink, Toggle } from './styles'

const events = [
  { event: `mousedown`, handler: `ClickOutside` },
  { event: `touchstart`, handler: `ClickOutside` },
  { event: `scroll`, handler: `Scroll` },
]

export default class Nav extends Component {
  static propTypes = {
    nav: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          title: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
          subNav: PropTypes.arrayOf({
            title: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
          }),
        }),
      })
    ),
  }
  state = {
    showNav: false,
    ref: React.createRef(),
    showSubNav: false,
  }

  toggleNav = () => {
    this.setState({ showNav: !this.state.showNav })
  }

  toggleSubNav = index => () => {
    const { showSubNav } = this.state
    this.setState({ showSubNav: index === showSubNav ? false : index })
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
    events.forEach(({ event, handler }) =>
      document.addEventListener(event, this[`handle` + handler])
    )
  }

  componentWillUnmount() {
    events.forEach(({ event, handler }) =>
      document.removeEventListener(event, this[`handle` + handler])
    )
  }

  render() {
    const { showNav, ref, showSubNav } = this.state
    const { nav, chapters } = this.props
    // clone nav and merge chapters
    // merging chapters without cloning results in chapters compounding on every page navigation
    const assembledNav = JSON.parse(JSON.stringify(nav))
    assembledNav.find(el => el.url === `/standorte`).subNav.unshift(...chapters)
    return (
      <Fragment>
        <Toggle onClick={this.toggleNav}>&#9776;</Toggle>
        <NavContainer role="navigation" ref={ref} showNav={showNav}>
          <Toggle inside onClick={this.toggleNav}>
            &times;
          </Toggle>
          {assembledNav.map(({ url, title, subNav }, index) => (
            <NavEntry key={url}>
              <NavLink
                activeClassName="active"
                to={url}
                as={subNav && showSubNav !== index && `span`}
                title={title}
                onClick={this.toggleSubNav(index)}
              >
                {title} {subNav && <span>&#9662;</span>}
              </NavLink>
              {subNav && (
                <SubNav showNav={showNav && showSubNav === index}>
                  {subNav.map(
                    item =>
                      !item.inactive && (
                        <NavLink
                          key={item.url}
                          to={url + item.url}
                          title={item.title}
                          span={item.span}
                          onClick={this.toggleNav}
                        >
                          {item.title}
                        </NavLink>
                      )
                  )}
                </SubNav>
              )}
            </NavEntry>
          ))}
        </NavContainer>
      </Fragment>
    )
  }
}
