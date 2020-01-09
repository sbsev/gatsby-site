import styled from 'styled-components'

export const Slides = styled.div`
  display: grid;
`

export const Slide = styled.div`
  grid-area: 1 / 1;
  height: 100vh;
  width: 100vw;
  opacity: ${props => (props.active ? 1 : 0)};
  visibility: ${props => (props.active ? `visible` : `hidden`)};
  transition: 1s ease-in-out;
  z-index: -1;
  animation: ken-burns ${props => 6 * props.duration}s linear infinite;
  @keyframes ken-burns {
    0% {
      transform: scale(1) translate(0);
    }
    25% {
      transform: scale(1.1) translate(3%, 1%);
    }
    50% {
      transform: scale(1) translate(0);
    }
    75% {
      transform: scale(1.1) translate(-3%, -1%);
    }
    100% {
      transform: scale(1) translate(0);
    }
  }
`
