import styled from 'styled-components'
import { Link } from 'gatsby'

import mediaQuery from '../../utils/mediaQuery'
import LogoComp from '../../assets/logo'
import { navLinkStyle } from '../Nav/styles'

export const Container = styled.div`
  background: ${props => props.theme.darkBlue};
  display: grid;
  grid-gap: calc(0.5em + 4vw);
  align-items: center;
  justify-content: space-between;
  grid-template-areas: 'nav title social';
  padding: 2vmin 3vmin;
  ${mediaQuery.minNetbook} {
    grid-template-areas: 'title nav social';
  }
  ${mediaQuery.minLaptop} {
    grid-template-columns: auto 1fr auto;
  }
`

export const SiteTitle = styled(Link)`
  grid-area: title;
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-gap: 1em;
  font-weight: bold;
  ${navLinkStyle};
  ${mediaQuery.minTablet} {
    grid-auto-flow: column;
  }
`

export const Logo = styled(LogoComp)`
  height: 3em;
  width: 3em;
  object-fit: cover;
  object-position: top;
  border-radius: 50%;
  background: ${props => props.theme.mainWhite};
  border: ${({ theme }) => theme.smallBorder + ' solid ' + theme.mainWhite};
`
