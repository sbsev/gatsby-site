import styled from 'styled-components'

export const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr));
  grid-auto-rows: calc(${props => props.rowHeight}px - 2em);
  grid-gap: 2em;
  font-size: 0.8em;
  line-height: 1.4em;
  grid-column: 2/4;
`

export const Post = styled.div`
  grid-row: span ${props => props.span};
  display: flex;
  flex-direction: column;
`
