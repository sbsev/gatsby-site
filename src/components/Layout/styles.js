import styled, { injectGlobal } from 'styled-components'

injectGlobal`
  body {
    font-size: calc(1rem + (1.4 - 1) * ((100vw - 20rem) / (100 - 20)));
    line-height: calc(1.5rem + (2.2 - 1.5) * ((100vw - 20rem) / (100 - 20)));
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    margin: 0 !important;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  #___gatsby {
    height: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    h1 {
      font-size: ${1.1 ** (7 - 1)}em;
    }
    h2 {
      font-size: ${1.1 ** (7 - 2)}em;
    }
    h3 {
      font-size: ${1.1 ** (7 - 3)}em;
    }
    h4 {
      font-size: ${1.1 ** (7 - 4)}em;
    }
    h5 {
      font-size: ${1.1 ** (7 - 5)}em;
    }
    h6 {
      font-size: ${1.1 ** (7 - 6)}em;
    }
  }
`

export const Content = styled.main`
  margin: 5vmin;
  display: grid;
  grid-template-columns: 1fr ${props => props.theme.maxWidth} 1fr;
  > * {
    grid-column: 2;
  }
`
