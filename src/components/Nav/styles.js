import React from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import mediaQuery from '../../utils/mediaQuery'

const isPartiallyActive = className => ({ isPartiallyCurrent }) =>
  isPartiallyCurrent ? { className: className + ' active' } : null

const PartiallyActiveLink = props => (
  <Link getProps={isPartiallyActive(props.className)} {...props} />
)

export const navLinkStyle = css`
  color: ${props => props.theme.lightBlue};
  transition: ${props => props.theme.shortTrans};
  cursor: pointer;
  &.active {
    color: ${props => props.theme.darkYellow};
  }
  :hover {
    color: ${props => props.theme.lightGreen};
  }
`

export const NavContainer = styled.nav`
  grid-area: nav;
  display: grid;
  grid-gap: 2vw;
  ${mediaQuery.netbook} {
    overflow-y: scroll;
    position: fixed;
    right: 100%;
    z-index: 2;
    background: ${props => props.theme.darkGray};
    padding: 5vh;
    grid-gap: 1em;
    height: 100vh;
    min-width: 15vw;
    grid-auto-columns: minmax(max-content, 1fr);
    grid-auto-rows: max-content;
    transform: translate(${props => (props.showNav ? `99%` : `0`)});
    transition: ${props => props.theme.mediumTrans};
  }
  ${mediaQuery.minNetbook} {
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    justify-self: start;
  }
`

export const NavEntry = styled.div`
  position: relative;
`

const subNavVisibleStyle = css`
  opacity: 1;
  pointer-events: initial;
  background: ${props => props.theme.mainGray};
`

export const SubNav = styled.div`
  display: grid;
  width: max-content;
  border-radius: ${props => props.theme.smallBorderRadius};
  grid-gap: 0.2em 0.5em;
  opacity: 0;
  position: absolute;
  transition: all 0.4s;
  padding: 0.5em 0.7em;
  grid-template-columns: ${props =>
    props.children.length >= 10 ? `1fr 1fr` : `1fr`};
  pointer-events: none;
  ${mediaQuery.netbook} {
    ${props => props.showNav && subNavVisibleStyle + `position: static;`};
  }
  ${mediaQuery.minNetbook} {
    ${NavEntry}:hover & {
      ${subNavVisibleStyle};
    }
  }
`

const span = css`
  grid-column: 1/-1;
  border-top: 1px solid ${props => props.theme.mainWhite};
  padding-top: 0.2em;
`

export const NavLink = styled(PartiallyActiveLink)`
  ${navLinkStyle};
  ${SubNav} & {
    color: ${props => props.theme.mainWhite};
    :hover {
      color: ${props => props.theme.lightGreen};
    }
    &.active {
      color: ${props => props.theme.lightBlue};
    }
    ${props => props.span && span};
  }
`

const inNavToggle = css`
  position: absolute;
  top: 0.3em;
  right: 0.5em;
`

const inHeaderToggle = css`
  grid-area: 1 / 1 / 1 / 1;
`

export const Toggle = styled.span`
  font-size: 1.8em;
  cursor: pointer;
  width: max-content;
  ${mediaQuery.minNetbook} {
    display: none;
  }
  ${props => (props.inside ? inNavToggle : inHeaderToggle)};
  ${navLinkStyle};
`
