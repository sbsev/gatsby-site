import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import mediaQuery from '../../utils/mediaQuery'

export const navLinkStyle = css`
  color: ${props => props.theme.lightGreen};
  &:hover {
    color: ${props => props.theme.mainWhite};
    text-decoration: none;
  }
  &.${props => props.activeClassName} {
    border-bottom: ${({ theme }) =>
      theme.mediumBorder + ` solid ` + theme.lightGreen};
    &:hover {
      border-bottom: ${({ theme }) =>
        theme.mediumBorder + ` solid ` + theme.mainWhite};
    }
  }
`

export const NavLink = styled(Link)`
  ${navLinkStyle};
`

export const NavContainer = styled.nav`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 2rem;
  grid-auto-columns: max-content;
  justify-self: end;
  ${mediaQuery.laptop} {
    justify-content: center;
  }
`

export const NavEntry = styled.div`
  position: relative;
`

export const SubNav = styled.div`
  position: absolute;
  left: 0;
  top: 2.5rem;
  width: max-content;
  display: none;
  ${NavEntry}:hover & {
    z-index: 2;
    display: grid;
    grid-template-columns: ${props =>
      props.children.length >= 10 ? `1fr 1fr` : `1fr`};
    grid-gap: 0 1rem;
    background: ${props => props.theme.mainBlue};
    padding: 0.5rem 1rem;
    border-radius: ${props => props.theme.smallBorderRadius};
    right: 0;
    ${mediaQuery.phone} {
      display: none;
    }
  }
`