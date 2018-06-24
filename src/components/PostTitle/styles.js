import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h1`
  margin: 0;
  font-weight: 300;
  color: ${props => props.theme.mainBlue};
`

export const Meta = styled.div`
  font-size: 0.9rem;
  width: fit-content;
  padding: 0 0.6rem;
  margin: 0.75rem 0 1.5rem;
  color: ${props => props.theme.mainGreen};
  border: ${({theme}) => theme.mediumBorder + ' solid ' + theme.darkBlue};
  border-radius: ${props => props.theme.largeBorderRadius};
`