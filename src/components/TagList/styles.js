import styled from "styled-components"

import mediaQuery from "../../utils/mediaQuery"

export const Container = styled.div`
  ${mediaQuery.minTablet} {
    grid-column: 4;
    grid-row: 2;
  }
  margin-bottom: 5vmin;
  h2 {
    margin-top: 0;
  }
`

export const Tag = styled.button`
  display: flex;
  align-items: center;
  color: ${props => props.active && props.theme.darkYellow};
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  border: none;
`

export const TagIcon = styled.img`
  height: 1.75em;
  width: 1.75em;
  min-width: 1.75em;
  margin-right: 0.7em;
  background: ${props => props.theme.lightGray};
  border-radius: ${props => props.theme.mediumBorderRadius};
  padding: 0.2em;
`

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  grid-gap: 1em;
`
