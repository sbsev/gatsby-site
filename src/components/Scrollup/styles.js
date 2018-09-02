import styled from 'styled-components'
import { ArrowUpCircle } from 'styled-icons/feather/ArrowUpCircle'

export const UpArrow = styled(ArrowUpCircle)`
  background: ${props => props.theme.lightGreen};
  color: ${props => props.theme.mainWhite};
  border-radius: 50%;
`
