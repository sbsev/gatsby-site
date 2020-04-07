import styled from 'styled-components'

export const DotsDiv = styled.div`
  grid-area: dots;
  display: grid;
  grid-gap: 1vw;
  grid-auto-flow: column;
  position: absolute;
  bottom: 1em;
  left: 50%;
  transform: translate(-50%);
`

export const Dot = styled.div`
  border-radius: 50%;
  height: ${props => props.size};
  width: ${props => props.size};
  background: rgba(0, 0, 0, 0.5);
  background: ${props => props.active && props.theme.lighterGreen};
  transition: 0.6s;
  border: 1px solid white;
  :hover {
    color: ${props => props.theme.lightBlue};
    background: ${props => props.theme.darkBlue};
    transform: scale(1.2);
    border: 1px solid ${props => props.theme.lightBlue};
  }
`
