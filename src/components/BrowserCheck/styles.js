import styled from 'styled-components'

export const BrowserWarning = styled.div`
  background: ${p => p.theme.lightBlue};
  color: white;
  text-align: center;
  p {
    max-width: 40em;
    padding: 0.2em 1em;
    margin: auto;
  }
  a {
    color: ${p => p.theme.darkYellow};
  }
`
