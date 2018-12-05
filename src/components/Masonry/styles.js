import styled from 'styled-components'

export const Parent = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${props => props.colWidth}, 1fr)
  );
  grid-auto-rows: calc(${props => props.rowHeight}px - 2em);
  grid-gap: 2em;
`

export const Child = styled.div`
  grid-row: span ${props => props.span};
  height: max-content;
`
