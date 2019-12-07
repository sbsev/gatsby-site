import styled from 'styled-components'

import mediaQuery from 'utils/mediaQuery'
import Owl from 'assets/logo'

export const HeaderContainer = styled.header`
  z-index: 3;
  font-size: 1.2em;
  background: ${props => props.theme.darkBlue};
  display: grid;
  grid-gap: calc(1em + 1vw);
  align-items: center;
  justify-items: center;
  grid-template-areas: 'title social search';
  grid-template-columns: 1fr auto auto;
  padding: calc(0.25em + 1vh) calc(1em + 1vw);
  font-weight: bold;
  ${mediaQuery.minNetbook} {
    grid-template-areas: 'title nav social search';
    grid-template-columns: auto 1fr auto auto;
  }
`

export const Logo = styled(Owl)`
  height: 3em;
  border-radius: 50%;
  background: white;
  padding: 0.1em;
`
