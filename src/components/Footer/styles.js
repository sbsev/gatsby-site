import styled from 'styled-components'

import mediaQuery from '../../utils/mediaQuery'
import Link from '../Link'

export const FooterContainer = styled.div`
  background: ${props => props.theme.darkBlue};
  padding: 5vh 5vw;
  color: ${props => props.theme.lightBlue};
  display: grid;
  text-align: center;
  align-items: center;
  justify-items: center;
  grid-gap: 7vh 5vw;
  grid-template-areas:
    'social'
    'copyright'
    'links';
  ${mediaQuery.minTablet} {
    justify-content: space-around;
    grid-template-areas:
      'copyright social'
      'links links';
  }
  ${mediaQuery.minLaptop} {
    grid-template-areas: 'copyright links social';
  }
`

export const Copyright = styled.div`
  grid-area: copyright;
`

export const FooterLinks = styled.div`
  grid-area: links;
  display: grid;
  grid-gap: 3vmin;
  grid-auto-flow: column;
  ${mediaQuery.phone} {
    grid-template-rows: auto auto;
    justify-items: center;
  }
`

export const FooterLink = styled(Link)`
  ${props => props.styles};
`

export const Source = styled.span`
  a {
    color: ${props => props.theme.lightGreen};
  }
`

export const PoweredBy = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 1em;
  a {
    height: 1.5em;
    width: 1.5em;
  }
`
