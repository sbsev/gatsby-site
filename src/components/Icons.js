import styled from 'styled-components'
import { Calendar } from 'styled-icons/octicons/Calendar.cjs'
import { Timer } from 'styled-icons/material/Timer.cjs'
import { FacebookSquare } from 'styled-icons/fa-brands/FacebookSquare.cjs'
import { Mail } from 'styled-icons/octicons/Mail.cjs'

export const DateIcon = styled(Calendar)`
  height: ${props => props.size || '1rem'};
  position: relative;
  top: -3px;
`

export const TimeIcon = styled(Timer)`
  height: ${props => props.size || '1rem'};
  position: relative;
  top: -2px;
`

export const FacebookIcon = styled(FacebookSquare)`
  height: ${props => props.size || '1rem'};
`

export const EmailIcon = styled(Mail)`
  height: ${props => props.size || '1rem'};
`