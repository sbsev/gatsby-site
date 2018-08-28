import styled from 'styled-components'

import mediaQuery from '../../utils/mediaQuery'
import Link from '../Link'

export const Container = styled.div`
  background-color: ${props => props.theme.darkGray};
  padding: 3rem;
  color: ${props => props.theme.mainWhite};
  display: flex;
  justify-content: space-around;
  align-items: center;
  ${mediaQuery.tablet} {
    flex-direction: column;
  }
`

export const FooterLinks = styled.div`
  background: ${props => props.theme.mainGray};
  padding: 0.7rem 1rem;
  border-radius: ${props => props.theme.largeBorderRadius};
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1vmin;
  ${mediaQuery.tablet} {
    margin-top: 1rem;
  }
`

export const FooterLink = styled(Link)`
  color: inherit;
  &:hover {
    color: ${props => props.theme.mainGreen};
    text-decoration: none;
  }
  & + & {
    margin-left: 1rem;
  }
`
