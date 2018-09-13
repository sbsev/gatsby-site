import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

export const Title = styled.h1`
  margin: 0.5em 0;
  font-size: 1.5em;
`

export const TitleLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.mainBlue};
`

export const Meta = styled.div`
  font-size: 0.9em;
  display: grid;
  grid: auto auto / max-content max-content;
  grid-gap: 0 1em;
  span {
    display: flex;
    align-items: center;
  }
  a {
    margin-left: 0.5em;
  }
`

export const AuthorPhoto = styled(Img)`
  grid-row: 1 / -1;
  border-radius: 50%;
`

export const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8em;
`

export const Category = styled(Link)`
  padding: 0 0.5em;
  border-radius: ${props => props.theme.smallBorderRadius};
  background: ${props => props.theme.lightGray};
  margin-left: 0.5em;
`

export const FeaturedImage = styled(Img)`
  width: 50%;
  transform: translate(50%);
  max-height: 20vmax;
  border-radius: ${props => props.theme.mediumBorderRadius};
`
