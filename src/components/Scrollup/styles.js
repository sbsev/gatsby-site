import styled from 'styled-components'
import { ArrowUpCircle } from 'styled-icons/feather/ArrowUpCircle'

export const UpArrow = styled(ArrowUpCircle)`
  background: ${props => props.theme.lightGreen};
  color: ${props => props.theme.mainWhite};
  border-radius: 50%;
  transition: ${props => props.theme.shortTrans};
  :hover {
    transform: scale(1.15);
    color: ${props => props.theme.lightBlue};
    background: ${props => props.theme.darkBlue};
  }
`
