import styled from "styled-components"
import Img from "gatsby-image"

import mediaQuery from "../../utils/mediaQuery"

export const Container = styled.div`
  grid-column: 1 / -1 !important;
  margin-top: -5vh;
  position: relative;
  text-align: center;
  height: 90vh;
  overflow: hidden;
`

export const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  color: ${props => props.theme.white};
  padding: 1em;
  border-radius: ${props => props.theme.mediumBorderRadius};
  width: calc(6em + 50vw);
  max-width: 35em;
  h1 {
    margin-top: 0;
  }
  h5 {
    margin-bottom: 0;
  }
  div > div {
    display: grid;
    grid-gap: 1em;
    span {
      background: rgba(0, 0, 0, 0.8);
      border-radius: ${props => props.theme.mediumBorderRadius};
      padding: 0 1em;
      display: grid;
      align-content: space-between;
    }
  }
  ${mediaQuery.minPhablet} {
    div > div {
      grid-template-columns: repeat(3, auto);
      grid-gap: 0 1em;
    }
  }
`

export const Hero = styled(Img)`
  position: absolute !important;
  object-fit: cover;
  height: 100%;
  width: 100%;
  opacity: ${props => (props.active ? 1 : 0)};
  visibility: ${props => (props.active ? `visible` : `hidden`)};
  transition: 1.5s ease-in;
`

export const Dots = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 1em;
  display: grid;
  grid-gap: 1vw;
  grid-auto-flow: column;
  color: ${props => props.theme.white};
`

export const Dot = styled.div`
  border-radius: 50%;
  height: 0.8em;
  width: 0.8em;
  background: rgba(0, 0, 0, 0.5);
  background: ${props => props.active && props.theme.lightGreen};
  transition: ${props => props.theme.mediumTrans};
  border: ${({ theme }) => theme.smallBorder + ` solid ` + theme.white};
  :hover {
    color: ${props => props.theme.lightBlue};
    background: ${props => props.theme.darkBlue};
    transform: scale(1.2);
    border: ${({ theme }) => theme.smallBorder + ` solid ` + theme.lightBlue};
  }
`
