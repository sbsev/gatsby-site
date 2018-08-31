import styled from 'styled-components'
import { Link } from 'gatsby'

import mediaQuery from '../../utils/mediaQuery'
import LogoComp from '../../assets/logo'

export const Container = styled.div`
  background: ${props => props.theme.darkBlue};
  display: grid;
  grid-gap: 6vmin;
  align-items: center;
  justify-content: space-between;
  grid-template-areas: 'nav title social';
  padding: 2vmin 4vmin;
  ${mediaQuery.minNetbook} {
    grid-template-areas: 'title nav social';
  }
  ${mediaQuery.minLaptop} {
    grid-template-columns: auto 1fr auto;
    grid-template-areas: 'title nav social';
  }
`

export const SiteTitle = styled(Link)`
  grid-area: title;
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-gap: 1em;
  font-weight: bold;
  ${props => props.styles};
  white-space: nowrap;
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
  background: white;
  border: ${({ theme }) => theme.smallBorder + ' solid ' + theme.mainWhite};
`
