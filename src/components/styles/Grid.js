import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${p => p.minWidth || `5em`}, 1fr));
  grid-gap: ${p => p.gap || `calc(1em + 2vh) calc(1em + 2vw)`};
  text-align: ${p => p.align};
  max-width: ${p => p.children.length === 1 && p.maxWidth};
`
