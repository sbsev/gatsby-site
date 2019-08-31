import styled from "styled-components"

export const BrowserWarning = styled.div`
  background: ${props => props.theme.lightBlue};
  color: white;
  text-align: center;
  p {
    max-width: ${props => props.theme.maxWidth};
    padding: 0.2em 1em;
    margin: auto;
  }
  a {
    color: ${props => props.theme.darkYellow};
  }
`
