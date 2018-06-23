import styled from 'styled-components'
import Link from 'gatsby-link'

export const Article = styled.article`
  & + & {
    margin-top: 3rem;
  }
`

export const Title = styled.h1`
  margin: 0.5rem 0;
  font-size: 1.5rem;
`

export const TitleLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.mainBlue};
`

export const Meta = styled.div`
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`
