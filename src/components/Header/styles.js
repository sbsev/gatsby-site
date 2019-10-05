import styled from 'styled-components'
import { Link } from 'gatsby'

import mediaQuery from '../../utils/mediaQuery'
import Owl from '../../assets/logo'
import { navLinkStyle } from '../Nav'

export const HeaderContainer = styled.header`
  background: ${props => props.theme.darkBlue};
  display: grid;
  grid-gap: calc(1em + 1vw);
  align-items: center;
  justify-items: center;
  grid-template-areas: 'nav title social search';
  grid-template-columns: auto 1fr auto auto;
  padding: calc(0.25em + 1vh) calc(1em + 1vw);
  font-weight: bold;
  ${mediaQuery.minNetbook} {
    grid-template-areas: 'title nav social search';
  }
`

export const SiteTitle = styled(Link)`
  grid-area: title;
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-gap: 1em;
  ${navLinkStyle};
  ${mediaQuery.minTablet} {
    grid-auto-flow: column;
  }
`

export const Logo = styled(Owl)`
  height: 3em;
  width: 3em;
  object-position: top;
  border-radius: 50%;
  background: white;
  padding: 0.1em;
`
