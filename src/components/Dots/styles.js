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
  height: ${p => p.size};
  width: ${p => p.size};
  background: rgba(0, 0, 0, 0.5);
  background: ${p => p.active && p.theme.green};
  transition: 0.6s;
  border: 1px solid white;
  :hover {
    color: ${p => p.theme.lightBlue};
    background: ${p => p.theme.darkBlue};
    transform: scale(1.2);
    border: 1px solid ${p => p.theme.lightBlue};
  }
`
