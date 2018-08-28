import styled from 'styled-components'

export const Layout = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`

export const Title = styled.h1`
  color: ${props => props.theme.lightGreen};
  background: ${props => props.theme.darkBlue};
  padding: 2rem;
  border-radius: ${props => props.theme.mediumBorderRadius};
`
