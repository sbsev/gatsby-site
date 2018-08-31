import styled from 'styled-components'

export const Posts = styled.div`
  display: grid;
  grid-gap: 5vmin;
  > * + * {
    margin-top: 5vmin;
  }
`
