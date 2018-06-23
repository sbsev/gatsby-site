import styled, { css } from 'styled-components'
import Link from 'gatsby-link'
import mediaQuery from '../../utils/mediaQuery'

const navLinkStyle = css`
  color: inherit;
  &:hover {
    color: ${props => props.theme.mainGreen};
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
  color: ${props => props.theme.lightText};
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
  border: 1px solid white;
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

export const NavLink = styled(Link)`
  ${navLinkStyle};
  margin-right: 1rem;
`

export const SubNavLink = styled(Link)`
  ${navLinkStyle};
  ${NavLink}:hover & {
    background: red;
  }
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