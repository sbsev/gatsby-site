import styled, { css } from 'styled-components'
import { Search } from 'styled-icons/fa-solid/Search'
import Input from './SearchBox'

export const Root = styled.div`
  position: relative;
  display: grid;
  justify-items: center;
  width: max-content;
  justify-self: center;
  grid-gap: 1em;
`

export const Loupe = styled(Search)`
  width: 1em;
  margin: 0.3em;
  pointer-events: none;
`

const collapse = css`
  width: 0;
  cursor: pointer;
  color: ${props => props.theme.lightBlue};
  + ${Loupe} {
    color: ${props => props.theme.lightBlue};
  }
  :focus {
    background: ${props => props.theme.lightBlue};
    color: ${props => props.theme.darkBlue};
    cursor: text;
    width: 5em;
    + ${Loupe} {
      color: ${props => props.theme.darkBlue};
    }
  }
  ::placeholder {
    color: ${props => props.theme.darkBlue};
  }
`

const expand = css`
  background: ${props => props.theme.lightGray};
  width: 6em;
`

export const SearchBox = styled(Input)`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  input {
    outline: none;
    border: none;
    font-size: 1em;
    background: transparent;
    transition: ${props => props.theme.shortTrans};
    margin-left: -1.6em;
    padding-left: 1.6em;
    border-radius: ${props => props.theme.smallBorderRadius};
    ${props => (props.collapse ? collapse : expand)};
  }
`

export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  position: ${props => props.position || `absolute`};
  right: 0;
  top: calc(100% + 0.5em);
  width: calc(4em + 40vw);
  max-width: 30em;
  background: ${props => props.theme.mainWhite};
  border-radius: ${props => props.theme.smallBorderRadius};
  max-height: 80vh;
  overflow: scroll;
  padding: 0.7em 1em 0.4em;
  box-shadow: 0 0 5px 0;
  * {
    margin-top: 0;
    list-style: none;
    padding: 0;
  }
  mark {
    color: ${props => props.theme.lightBlue};
    background: ${props => props.theme.darkBlue};
    font-style: normal;
  }
  > * + * {
    padding-top: 1em;
    border-top: 2px solid ${props => props.theme.darkGray};
  }
  li + li {
    margin-top: 0.7em;
    padding-top: 0.7em;
    border-top: 1px solid ${props => props.theme.lightGray};
  }
  h3 {
    margin-bottom: 0.3em;
  }
`

export const By = styled.span`
  font-size: 0.6em;
  text-align: end;
  padding: 0;
`
