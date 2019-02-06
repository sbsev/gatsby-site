import styled from "styled-components"

export const Wrapper = styled.div`
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
  margin: 2em 0;
  img {
    width: 100%;
  }
`
