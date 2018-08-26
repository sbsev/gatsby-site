import styled, { injectGlobal } from 'styled-components'

injectGlobal`
  #___gatsby {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`

export const Content = styled.main`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  margin: 2rem auto;
  padding: 1rem;
  flex: 1;
`