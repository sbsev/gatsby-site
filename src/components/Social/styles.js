import styled from 'styled-components'
import { Mail as Email } from 'styled-icons/octicons/Mail'
import { Youtube } from 'styled-icons/fa-brands/Youtube'
import { LinkedinIn as Linkedin } from 'styled-icons/fa-brands/LinkedinIn'
import { FacebookF as Facebook } from 'styled-icons/fa-brands/FacebookF'
import { Github } from 'styled-icons/fa-brands/Github'

export const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 0.5rem;
  grid-auto-columns: max-content;
  ${props => props.styles};
`

export const Icons = {
  Email,
  Youtube,
  Linkedin,
  Facebook,
  Github,
}
