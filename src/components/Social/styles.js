import styled, { css } from 'styled-components'
import { Share } from 'styled-icons/material/Share'
import { Youtube } from 'styled-icons/fa-brands/Youtube'
import { Linkedin } from 'styled-icons/fa-brands/Linkedin'
import { FacebookSquare as Facebook } from 'styled-icons/fa-brands/FacebookSquare'
import { Github } from 'styled-icons/fa-brands/Github'
import { Instagram } from 'styled-icons/fa-brands/Instagram'
import { Twitter } from 'styled-icons/fa-brands/Twitter'

import mediaQuery from 'utils/mediaQuery'

export const SocialDiv = styled.div`
  position: relative;
  justify-self: end;
`

const collapse = css`
  display: grid;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  background: ${props => props.theme.lighterGreen};
  border-radius: ${props => props.theme.smallBorderRadius};
  padding: 1vmin;
  font-size: 1.3em;
  transition: 0.3s;
  ${SocialDiv}:hover & {
    visibility: visible;
    opacity: 1;
  }
`

const alwaysShow = css`
  grid-auto-flow: column;
  align-items: end;
  grid-auto-columns: max-content;
  grid-area: social;
  ${props => props.styles};
`

export const Container = styled.div`
  display: grid;
  grid-gap: 0.8em;
  ${mediaQuery.minLaptop} {
    ${alwaysShow};
  }
  ${mediaQuery.maxLaptop} {
    ${props => (props.collapse ? collapse : alwaysShow)};
  }
`

export const Toggle = styled(Share).attrs({ size: `1em` })`
  color: white;
  cursor: pointer;
  font-size: 1.3em;
  ${mediaQuery.minLaptop} {
    display: none;
  }
`

export const Icons = {
  Youtube,
  Linkedin,
  Facebook,
  Github,
  Instagram,
  Twitter,
}
