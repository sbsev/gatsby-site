import styled from 'styled-components'

export const ArticleGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  grid-gap: 1rem;
`

export const Article = styled.div`
  h4 {
    padding: 0.2rem 0.5rem;
    background: ${props => props.theme.lightGray};
    border-radius: ${props => props.theme.smallBorderRadius};
    color: ${props => props.theme.mainBlue};
  }
  h6 {
    margin-top: 0.2rem;
  }
`