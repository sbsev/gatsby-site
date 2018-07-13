import styled from 'styled-components'

export const List = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 1rem;
  grid-auto-columns: max-content;
  margin-top: 1rem;
`

export const Subsection = styled.p`
  padding: 0.2rem 0.5rem;
  background: ${({ theme, active }) => active ? theme.mainBlue : theme.lightGray};
  border-radius: ${props => props.theme.smallBorderRadius};
  a {
    color: ${({ theme, active }) => active ? theme.mainWhite : theme.mainBlack};
  }
`