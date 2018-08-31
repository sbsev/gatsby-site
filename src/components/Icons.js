import styled from 'styled-components'
import { Calendar } from 'styled-icons/octicons/Calendar.cjs'
import { Timer } from 'styled-icons/material/Timer.cjs'

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
