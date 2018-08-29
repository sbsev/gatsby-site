import styled from 'styled-components'

import mediaQuery from '../../utils/mediaQuery'
import Link from '../Link'

export const Container = styled.div`
  background: ${props => props.theme.darkBlue};
  padding: 5vmin 8vmin;
  color: ${props => props.theme.mainYellow};
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: space-around;
  grid-gap: 3vmin;
`

export const FooterLinks = styled.div`
  padding: 0.7rem 1rem;
  display: grid;
  grid-gap: 3vmin;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  justify-content: center;
  ${mediaQuery.laptop} {
    grid-row: 2;
    grid-column: span 2;
  }
`

export const FooterLink = styled(Link)`
  ${props => props.css};
`
