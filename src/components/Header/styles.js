import styled, { css } from 'styled-components'
import Link from 'gatsby-link'

import mediaQuery from '../../utils/mediaQuery'

const navLinkStyle = css`
  color: inherit;
  white-space: nowrap;
  &:hover {
    color: ${props => props.hoverblue ? props.theme.mainBlue : props.theme.mainGreen};
    text-decoration: none;
  }
`

export const Background = styled.header`
  background-color: ${props => props.theme.darkBlue};
`

export const Content = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0.75rem;
  color: ${props => props.theme.mainWhite};
  display: grid;
  grid-gap: 0.25rem 1rem;
  justify-items: center;
  align-items: center;
  ${mediaQuery.minTablet} {
    grid-template-columns: min-content min-content 1fr min-content;
    padding: 1.25rem;
  }
`

export const Logo = styled.div`
  height: 3rem;
  width: 3rem;
  padding: 0.2rem;
  border-radius: 50%;
  background: white;
  overflow: hidden;
  border: ${({theme}) => theme.smallBorder + ' solid ' + theme.mainWhite};
`

export const SiteTitle = styled(Link)`
  ${navLinkStyle};
  font-weight: bold;
  white-space: nowrap;
  color: ${props => props.theme.mainGreen};
`

export const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  ${mediaQuery.laptop} {
    justify-content: center;
  }
`

export const NavEntry = styled.div`
  margin-right: 1.5rem;
  position: relative;
`

export const NavSubEntry = styled.div`
  position: absolute;
  display: none;
  ${NavEntry}:hover & {
    z-index: 2;
    display: grid;
    grid-template-columns: ${props => props.children.length >= 10 ? `1fr 1fr` : `1fr`};
    grid-gap: 0 1rem;
    background: ${props => props.theme.mainGreen};
    padding: 0.5rem 1rem;
    border-radius: ${props => props.theme.smallBorderRadius};
    right: 0;
  }
`

export const NavLink = styled(Link)`
  ${navLinkStyle};
`

export const NavIcons = styled.div`
  display: flex;
`

export const NavIcon = styled.a`
  ${navLinkStyle};
  & + & {
    margin-left: 0.5rem;
  }
`