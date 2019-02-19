import styled from "styled-components"

export const CookieConsentContainer = styled.div`
  position: fixed;
  z-index: 20;
  max-width: 14em;
  background: ${props => props.theme.lightGreen};
  border-radius: ${props => props.theme.mediumBorderRadius};
  box-shadow: 0 0.05em 1em ${props => props.theme.gray};
  color: white;
  bottom: 1em;
  right: 1em;
  padding: 0.5em 1em;
  transition: ${props => props.theme.longTrans};
  opacity: ${props => (props.visible ? 1 : 0)};
  visibility: ${props => (props.visible ? `visible` : `hidden`)};
  font-size: 0.9em;
  line-height: 1.4em;
  display: grid;
  grid-gap: 0.5em;
  button {
    cursor: pointer;
    justify-self: end;
    font-size: 0.9em;
    background: ${props => props.theme.darkBlue};
    color: white;
    border-radius: ${props => props.theme.mediumBorderRadius};
    border: none;
    padding: 0.2em 0.5em;
  }
`
