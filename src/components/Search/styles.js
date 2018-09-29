import styled from 'styled-components'
import { Search } from 'styled-icons/fa-solid/Search'
import { navLinkStyle } from '../Nav/styles'

export const Container = styled.div`
  position: relative;
`

export const SearchWrapper = styled.div`
  grid-area: search;
  position: absolute;
  top: 1em;
  right: 0;
  display: ${props => (props.show ? `block` : `none`)};
  .ais-SearchBox-input {
    background: ${props => props.theme.lightBlue};
    outline: none;
    border: none;
    color: white;
    font-size: inherit;
  }
  .ais-SearchBox-reset,
  .ais-SearchBox-submit {
    display: none;
  }
`

export const HitsWrapper = styled.div`
  display: ${props => (props.show ? `block` : `none`)};
  position: absolute;
  right: 0;
  width: calc(5em + 30vw);
  background: ${props => props.theme.lightGreen};
  max-height: 80vh;
  overflow: scroll;
  .ais-InfiniteHits-list {
    list-style: none;
    padding: 1em;
    margin: 0;
  }
`

export const Loupe = styled(Search)`
  ${navLinkStyle};
  width: 1em;
`
