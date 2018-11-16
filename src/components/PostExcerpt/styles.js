import styled from 'styled-components'
import Img from 'gatsby-image'

export const Post = styled.article`
  height: 100%;
  display: grid;
  background: ${props => props.theme.veryLightGray};
  border-radius: ${props => props.theme.mediumBorderRadius};
  border: 1px solid ${props => props.theme.lightGray};
  overflow: scroll;
  > div {
    padding: 1em;
    display: grid;
  }
`

export const Title = styled.h3`
  margin: 0;
`

export const Meta = styled.div`
  display: grid;
  grid-gap: 0 1em;
  grid-template-areas:
    'photo author'
    'photo date'
    'photo readtime';
  grid-template-columns: max-content 1fr;
  margin-bottom: 0.5em;
`

export const AuthorPhoto = styled(Img)`
  border-radius: 50%;
  grid-area: photo;
`
