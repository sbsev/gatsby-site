import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h1`
  color: ${props => props.theme.mainBlue};
`

export const Meta = styled.div`
  font-size: 0.9em;
  width: fit-content;
  padding: 0 0.6em;
  margin: 0.75em 0 1.5em;
  color: ${props => props.theme.lightBlue};
  border: ${({ theme }) => theme.mediumBorder + ' solid ' + theme.darkBlue};
  border-radius: ${props => props.theme.largeBorderRadius};
`

export const FeaturedImage = styled.img`
  width: 100%;
  max-height: 30vmax;
  object-fit: cover;
  margin: 3vmin 0;
`
