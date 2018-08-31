import styled from 'styled-components'
import { Link } from 'gatsby'

export const Title = styled.h1`
  margin: 0.5em 0;
  font-size: 1.5em;
`

export const TitleLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.mainBlue};
`

export const Meta = styled.div`
  margin-bottom: 0.5em;
  font-size: 0.9em;
`

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8em;
`

export const Tag = styled.span`
  padding: 0 0.5em;
  border-radius: ${props => props.theme.smallBorderRadius};
  background: ${props => props.theme.lightGray};
  margin-left: 0.5em;
`

export const FeaturedImage = styled.img`
  width: 50%;
  transform: translate(50%);
  max-height: 20vmax;
  object-fit: cover;
`
