import styled from 'styled-components'
import { Calendar } from 'styled-icons/octicons/Calendar.cjs'
import { Timer } from 'styled-icons/material/Timer.cjs'
import { Email } from 'styled-icons/material/Email.cjs'
import { FacebookSquare } from 'styled-icons/fa-brands/FacebookSquare.cjs'
import { Github } from 'styled-icons/fa-brands/Github.cjs'
import { Linkedin } from 'styled-icons/fa-brands/Linkedin.cjs'

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

export const EmailIcon = styled(Email)`
  height: ${props => props.size || '1rem'};
`

export const FacebookIcon = styled(FacebookSquare)`
  height: ${props => props.size || '1rem'};
`

export const GitHubIcon = styled(Github)`
  height: ${props => props.size || '1rem'};
`

export const LinkedinIcon = styled(Linkedin)`
  height: ${props => props.size || '1rem'};
`