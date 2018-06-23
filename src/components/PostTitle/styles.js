import styled from 'styled-components'

export const Layout = styled.div`
  text-align: center;
`

export const Title = styled.h1`
  margin: 0;
  font-weight: 300;
  color: ${props => props.theme.mainBlue};
`

export const Meta = styled.div`
  font-size: 0.9rem;
  margin: 0.75rem 0 1.5rem;
  color: ${props => props.theme.mainGreen};
`