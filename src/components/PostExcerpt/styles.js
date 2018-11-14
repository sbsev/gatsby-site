import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

export const Post = styled.article`
  background: ${props => props.theme.veryLightGray};
  padding: 1em;
  border-radius: ${props => props.theme.mediumBorderRadius};
  flex: 1;
  align-items: space-between;
`

export const Title = styled.h3`
  margin: 0.5em 0;
`

export const Meta = styled.div`
  display: grid;
  grid-gap: 0 1em;
  grid-template-areas:
    'photo author'
    'photo date'
    'photo readtime';
  grid-auto-columns: max-content;
`

export const AuthorPhoto = styled(Img)`
  border-radius: 50%;
  grid-area: photo;
`

export const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.5em 0;
`

export const Category = styled(Link)`
  padding: 0 0.5em;
  border-radius: ${props => props.theme.smallBorderRadius};
  background: ${props => props.theme.lightGray};
  margin-left: 0.5em;
`

export const FeaturedImage = styled(Img)`
  max-height: 25vmax;
  margin: -1em;
  margin-bottom: initial;
  border-top-left-radius: ${props => props.theme.mediumBorderRadius};
  border-top-right-radius: ${props => props.theme.mediumBorderRadius};
`
