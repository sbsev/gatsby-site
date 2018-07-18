import styled from 'styled-components'
import { Link } from 'gatsby'

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

export const Tags = styled.p`
  display: flex;
  flex-wrap: wrap;
`

export const Tag = styled.span`
  padding: 0 0.5rem;
  border-radius: ${props => props.theme.largeBorderRadius};
  background: ${props => props.theme.lightGray};
  margin-left: 0.5rem;
`