import styled from 'styled-components'

export const Grid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
`

export const Description = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`

export const ImageContainer = styled.figure`
  text-align: center;
  margin: 0;
  img {
    width: 100%;
    max-width: 15rem;
    border-radius: 50%;
    margin: 0;
  }
  p {
    margin: 0;
  }
  p + p {
    font-weight: 200;
  }
`