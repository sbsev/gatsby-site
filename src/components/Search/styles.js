import styled from 'styled-components'
import { Search } from 'styled-icons/fa-solid/Search'

export const Root = styled.div`
  position: relative;
`

export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `grid` : `none`)};
  position: absolute;
  right: 0;
  top: calc(100% + 0.5em);
  width: calc(5em + 30vw);
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
  em {
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

export const Input = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  color: ${props => props.theme.lightBlue};
  border-radius: ${props => props.theme.smallBorderRadius};
  transition: ${props => props.theme.shortTrans};
  :focus-within {
    color: ${props => props.theme.darkBlue};
    background: ${props => props.theme.lightBlue};
  }
  input {
    outline: none;
    border: none;
    font-size: inherit;
    width: 0;
    background: transparent;
    transition: ${props => props.theme.shortTrans};
    margin-left: -2em;
    padding-left: 2em;
    padding-right: 0.5em;
    cursor: pointer;
    :focus {
      cursor: text;
      width: 7em;
    }
    ::placeholder {
      color: ${props => props.theme.darkBlue};
    }
    ::-webkit-search-cancel-button {
      display: none;
    }
  }
  button {
    display: none;
  }
`

export const Loupe = styled(Search)`
  width: 1.25em;
  padding: 0.2em 0.5em;
  pointer-events: none;
`

export const By = styled.span`
  font-size: 0.6em;
  text-align: end;
  padding: 0;
`
