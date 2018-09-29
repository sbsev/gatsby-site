import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import mediaQuery from '../../utils/mediaQuery'

export const navLinkStyle = css`
  color: ${props => props.theme.lightBlue};
  transition: ${props => props.theme.shortTrans};
  :hover {
    color: ${props => props.theme.mainWhite};
  }
  &.${props => props.activeClassName} {
    border-bottom: ${({ theme }) =>
      theme.mediumBorder + ` solid ` + theme.lightBlue};
    :hover {
      border-bottom: ${({ theme }) =>
        theme.mediumBorder + ` solid ` + theme.mainWhite};
    }
  }
`

export const Container = styled.nav`
  grid-area: nav;
  display: grid;
  grid-gap: 2vw;
  ${mediaQuery.netbook} {
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
    transform: translate(${props => (props.show ? `99%` : `0`)});
    transition: ${props => props.theme.mediumTrans};
  }
  ${mediaQuery.minNetbook} {
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    justify-self: end;
  }
  ${props => props.css};
`

export const NavEntry = styled.div`
  position: relative;
`

const hover = css`
  ${NavEntry}:hover & {
    z-index: 2;
    display: grid;
    grid-template-columns: ${props =>
      props.children.length >= 10 ? `1fr 1fr` : `1fr`};
    grid-gap: 0 1em;
    background: ${props => props.theme.lightGreen};
    padding: 0.5em 1em;
    border-radius: ${props => props.theme.smallBorderRadius};
  }
`

export const SubNav = styled.div`
  position: absolute;
  left: 0;
  width: max-content;
  display: none;
  ${mediaQuery.netbook} {
    ${props => props.show && hover};
  }
  ${mediaQuery.minNetbook} {
    ${hover};
  }
`

const span = css`
  grid-column: 1/-1;
  border-top: 1px solid ${props => props.theme.mainWhite};
`

export const NavLink = styled(Link)`
  ${navLinkStyle};
  ${SubNav} & {
    color: ${props => props.theme.mainWhite};
    :hover {
      color: ${props => props.theme.darkBlue};
    }
    ${props => props.span && span};
  }
`

export const Toggle = styled.div`
  font-size: 1.8em;
  cursor: pointer;
  ${mediaQuery.minNetbook} {
    display: none;
  }
  ${props =>
    props.inside &&
    `
    position: absolute;
    top: 0.3em;
    right: 0.5em;
  `};
  ${navLinkStyle};
`
