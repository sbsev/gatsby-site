import styled from 'styled-components'
import { mediaQueries } from 'utils/mediaQueries'

export const FooterDiv = styled.footer`
  background: ${p => p.theme.darkBlue};
  padding: 5vh 5vw;
  color: white;
  font-weight: bold;
  display: grid;
  text-align: center;
  align-items: center;
  justify-items: center;
  grid-gap: 7vh 5vw;
  grid-template-areas:
    'copyright'
    'social'
    'links';
  ${mediaQueries.minTablet} {
    justify-content: space-around;
    grid-template-areas:
      'copyright social'
      'links links';
  }
  ${mediaQueries.minLaptop} {
    grid-template-areas: 'copyright links social';
  }
  a {
    color: white;
    :hover {
      color: ${p => p.theme.lightBlue};
    }
  }
`

export const FooterLinks = styled.div`
  grid-area: links;
  display: grid;
  grid-gap: 3vmin;
  grid-auto-flow: column;
  ${mediaQueries.maxPhone} {
    grid-template-rows: auto auto;
  }
`

export const Source = styled.span`
  a {
    color: ${p => p.theme.green};
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
    transition: 0.3s;
    :hover {
      transform: scale(1.1);
    }
  }
`
