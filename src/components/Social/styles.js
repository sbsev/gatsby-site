import styled, { css } from 'styled-components'
import {
  FacebookSquare as Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  XingSquare,
  Youtube,
} from 'styled-icons/fa-brands'
import { Share } from 'styled-icons/material'
import { ContactsBook } from 'styled-icons/remix-fill'
import mediaQuery from 'utils/mediaQuery'

export const SocialDiv = styled.div`
  position: relative;
`

const collapse = css`
  display: grid;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  background: ${p => p.theme.lighterGreen};
  border-radius: 0.2em;
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
`

export const Container = styled.div`
  display: grid;
  grid-gap: 0.8em;
  ${mediaQuery.minLaptop} {
    ${alwaysShow};
  }
  ${mediaQuery.maxLaptop} {
    ${p => (p.collapse ? collapse : alwaysShow)};
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
  Kontakt: styled(ContactsBook)`
    vertical-align: -0.15em;
  `,
  Youtube,
  Linkedin,
  Facebook,
  Github,
  Instagram,
  Twitter,
  Xing: XingSquare,
}
