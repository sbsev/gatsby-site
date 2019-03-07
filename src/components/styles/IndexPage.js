import styled from "styled-components"

import mediaQuery from "../../utils/mediaQuery"

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
`

export const Subtitle = styled.div`
  div {
    display: grid;
    grid-gap: 0.8em;
    span {
      font-size: 0.8em;
      background: rgba(0, 0, 0, 0.8);
      border-radius: ${props => props.theme.mediumBorderRadius};
      padding: 0.8em;
      display: grid;
      align-content: space-between;
      grid-gap: 0.5em;
    }
  }
  ${mediaQuery.minPhablet} {
    div {
      grid-template-columns: repeat(3, auto);
    }
  }
`
