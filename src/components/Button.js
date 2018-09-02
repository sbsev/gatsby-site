import styled from 'styled-components'

import Link from './Link'

export const Button = styled(Link)`
  background: ${props => props.theme.darkBlue};
  color: ${props => props.theme.mainWhite};
  border-radius: ${props => props.theme.smallBorderRadius};
  padding: 0.4em 0.6em;
  font-size: 1.3em;
  transition: ${props => props.theme.shortTrans};
  :hover {
    background: ${props => props.theme.lightBlue};
  }
`
