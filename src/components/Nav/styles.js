import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import mediaQuery from '../../utils/mediaQuery'

export const navLinkStyle = css`
  color: ${props => props.theme.lightBlue};
  transition: ${props => props.theme.shortTrans};
  cursor: pointer;
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

export const NavContainer = styled.nav`
  grid-area: nav;
  display: grid;
  grid-gap: 2vw;
  overflow-y: scroll;
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
    transform: translate(${props => (props.showNav ? `100%` : `0`)});
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

const showSubNav = css`
  display: grid;
  visibility: visible;
  opacity: 1;
`

export const SubNav = styled.div`
  display: grid;
  width: max-content;
  border-radius: ${props => props.theme.smallBorderRadius};
  grid-gap: 0.5em;
  background: ${props => props.theme.mainGray};
  opacity: 0;
  position: absolute;
  transition: opacity 0.25s;
  padding: 0.7em 1em;
  grid-template-columns: ${props =>
    props.children.length >= 10 ? `1fr 1fr` : `1fr`};
  ${mediaQuery.netbook} {
    ${props => props.showNav && showSubNav + `position: static;`};
  }
  ${mediaQuery.minNetbook} {
    ${NavEntry}:hover & {
      left: 0;
      z-index: 2;
      ${showSubNav}
    }
  }
`
// const hover = css`
//   ${NavEntry}:hover & {
//     z-index: 2;
//     display: grid;
//     grid-template-columns: ${props =>
//       props.children.length >= 10 ? `1fr 1fr` : `1fr`};
//     grid-gap: 0 1em;
//     background: ${props => props.theme.lightGreen};
//     padding: 0.5em 1em;
//     border-radius: ${props => props.theme.smallBorderRadius};
//   }
// `

// export const SubNav = styled.div`
//   position: absolute;
//   left: 0;
//   width: max-content;
//   display: none;
//   ${mediaQuery.netbook} {
//     ${props => props.show && hover};
//   }
//   ${mediaQuery.minNetbook} {
//     ${hover};
//   }
// `

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
