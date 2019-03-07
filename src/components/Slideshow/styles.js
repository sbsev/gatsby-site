import styled from "styled-components"

export const SlideContainer = styled.div`
  display: grid;
  position: absolute;
`

export const Slide = styled.div`
  grid-area: 1 / 1;
  height: 100vh;
  width: 100vw;
  opacity: ${props => (props.active ? 1 : 0)};
  visibility: ${props => (props.active ? `visible` : `hidden`)};
  transform: scale(${props => (props.active ? 1 : 1.2)});
  transition: 1s ease-in;
  animation: kenburns ${props => 8 * props.delay}s linear infinite;
  @keyframes kenburns {
    0% {
      transform: scale(1) translate(0);
    }
    25% {
      transform: scale(1.2) translate(3%, 1%);
    }
    50% {
      transform: scale(1) translate(0);
    }
    75% {
      transform: scale(1.2) translate(-3%, -1%);
    }
    100% {
      transform: scale(1) translate(0);
    }
  }
`
