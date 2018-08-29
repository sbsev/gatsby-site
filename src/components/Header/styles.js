import styled from 'styled-components'
import { Link } from 'gatsby'

import mediaQuery from '../../utils/mediaQuery'
import LogoComp from '../../assets/logo'

export const Container = styled.div`
  background-color: ${props => props.theme.darkBlue};
  display: grid;
  grid-gap: 1vmin 7vmin;
  align-items: center;
  justify-content: center;
  grid-auto-columns: max-content;
  ${mediaQuery.minLaptop} {
    grid-template-columns: auto 1fr auto;
    padding: 1.25rem 2rem;
  }
`

export const SiteTitle = styled(Link)`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  grid-gap: 1rem;
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
