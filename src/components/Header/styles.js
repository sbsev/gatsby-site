import styled from 'styled-components'

import mediaQuery from 'utils/mediaQuery'
import Owl from 'assets/logo'

export const HeaderContainer = styled.header`
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  width: fill-available;
  z-index: 1;
  font-size: 1.2em;
  display: grid;
  grid-gap: calc(1em + 1vw);
  align-items: center;
  grid-template-areas: 'title social search';
  grid-template-columns: 1fr auto auto;
  padding: calc(0.25em + 1vh) calc(1em + 1vw);
  font-weight: bold;
  ${mediaQuery.minNetbook} {
    grid-template-areas: 'title nav social search';
    grid-template-columns: auto auto 1fr auto;
  }
  a {
    color: white;
    transition: 0.3s;
    &.active {
      color: ${props => props.theme.orange};
    }
    :hover {
      color: ${props => props.theme.lightBlue};
    }
  }
`

export const Logo = styled(Owl)`
  height: 2.5em;
  border-radius: 50%;
  background: white;
  padding: 0.1em;
`
