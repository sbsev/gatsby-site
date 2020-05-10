import React from 'react'
import styled, { css } from 'styled-components'
import { Algolia } from 'styled-icons/fa-brands'
import { Search } from 'styled-icons/fa-solid'

export const Root = styled.div`
  position: relative;
  display: grid;
  grid-gap: 1em;
`

export const SearchIcon = styled(Search)`
  width: 1em;
  pointer-events: none;
`

const focus = css`
  background: white;
  color: ${p => p.theme.darkBlue};
  cursor: text;
  width: 5em;
  + ${SearchIcon} {
    color: ${p => p.theme.darkBlue};
    margin: 0.3em;
  }
`

const collapse = css`
  width: 0;
  cursor: pointer;
  color: ${p => p.theme.lightBlue};
  + ${SearchIcon} {
    color: white;
  }
  ${p => p.focus && focus}
  margin-left: ${p => (p.focus ? `-1.6em` : `-1em`)};
  padding-left: ${p => (p.focus ? `1.6em` : `1em`)};
  ::placeholder {
    color: ${p => p.theme.darkBlue};
  }
`

const expand = css`
  background: ${p => p.theme.lighterGray};
  width: 6em;
  margin-left: -1.6em;
  padding-left: 1.6em;
  + ${SearchIcon} {
    margin: 0.3em;
  }
`

export const Input = styled.input`
  outline: none;
  border: none;
  font-size: 1em;
  background: transparent;
  transition: 0.3s;
  border-radius: 0.2em;
  ${p => (p.collapse ? collapse : expand)};
`

export const Form = styled.form`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`

export const HitsWrapper = styled.div`
  font-size: 0.8em;
  display: ${p => (p.show ? `grid` : `none`)};
  background: white;
  max-height: 80vh;
  overflow: scroll;
  z-index: 2;
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: 80vw;
  max-width: 30em;
  box-shadow: 0 0 5px 0;
  padding: 0.7em 1em 0.4em;
  border-radius: 0.2em;
  a {
    color: ${p => p.theme.blue} !important;
  }
  * {
    margin-top: 0;
  }
  > div {
    padding-top: 0.6em;
  }
  div + div {
    margin-top: 0.6em;
    border-top: 1px solid ${p => p.theme.lightGray};
  }
  header {
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid ${p => p.theme.darkGray};
    h2 {
      color: white;
      background: ${p => p.theme.orange};
      padding: 0.1em 0.4em;
      border-radius: 0.2em;
      margin-bottom: 0.3em;
    }
  }
  * + header {
    padding-top: 1em;
  }
  h3 {
    margin-bottom: 0.3em;
  }
`

export const PoweredBy = () => (
  <span css="font-size: 0.6em; text-align: end; padding: 0;">
    Powered by{` `}
    <a href="https://algolia.com">
      <Algolia size="1em" /> Algolia
    </a>
  </span>
)
