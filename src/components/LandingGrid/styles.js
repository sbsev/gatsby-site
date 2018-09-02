import styled from 'styled-components'

import { ArrowDown } from 'styled-icons/feather/ArrowDown'

export { Button } from '../Button'

export const Grid = styled.div`
  grid-column: 1 / -1 !important;
  display: grid;
  grid-template-columns: repeat(5, 20vw);
  grid-template-rows: 15vh 60vh 15vh;
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`

export const Title = styled.div`
  background: rgba(255, 255, 255, 0.6);
  color: ${props => props.theme.darkBlue};
  grid-row: 2;
  grid-column: 1 / -1;
  align-self: center;
  justify-self: center;
  padding: 2em;
  border-radius: ${props => props.theme.mediumBorderRadius};
  text-align: center;
  max-width: 60%;
  h2 {
    margin: 2em 0;
    text-align: center;
  }
`

export const Img = styled.img`
  cursor: pointer;
`

export const Hero = styled.img`
  grid-row: 2;
  grid-column: 1 / -1;
`

export const Scroll = styled(ArrowDown)`
  cursor: pointer;
  color: ${props => props.theme.lightBlue};
  background: ${props => props.theme.darkBlue};
  border: 2px solid ${props => props.theme.lightBlue};
  border-radius: 50%;
  font-size: 2em;
  position: absolute;
  bottom: 1vh;
  left: 50%;
  transform: translateX(-50%);
`
