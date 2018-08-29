import styled from 'styled-components'
import { Email } from 'styled-icons/material/Email'
import { Youtube } from 'styled-icons/fa-brands/Youtube'
import { LinkedinIn as Linkedin } from 'styled-icons/fa-brands/LinkedinIn'
import { FacebookF as Facebook } from 'styled-icons/fa-brands/FacebookF'
import { Github } from 'styled-icons/fa-brands/Github'

export const Container = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1.2vmin;
  align-items: end;
  grid-auto-columns: max-content;
  justify-self: end;
`

export const Icons = {
  Email,
  Youtube,
  Linkedin,
  Facebook,
  Github,
}
