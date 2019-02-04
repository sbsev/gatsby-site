import styled from "styled-components"
import Img from "gatsby-image"

export const Post = styled.article`
  height: 100%;
  display: grid;
  background: ${props => props.theme.lighterGray};
  border-radius: ${props => props.theme.mediumBorderRadius};
  border: 1px solid ${props => props.theme.lightGray};
  overflow: hidden;
  > main {
    padding: 1em;
    display: grid;
  }
  a:first-child .gatsby-image-wrapper {
    height: 11em;
  }
`

export const Title = styled.h2`
  margin-top: 0;
`

export const Meta = styled.div`
  display: grid;
  grid-gap: 0 1em;
  grid-template-areas:
    "photo author"
    "photo date"
    "photo readtime";
  grid-template-columns: max-content 1fr;
  margin-bottom: 0.5em;
`

export const AuthorPhoto = styled(Img)`
  border-radius: 50%;
  grid-area: photo;
`

export const Tag = styled.button`
  color: ${props => props.active && props.theme.white};
  background: ${props => props.active && props.theme.darkBlue};
  font-size: 0.9em;
  margin-bottom: 0.2em;
  cursor: pointer;
  outline: none;
  border: none;

  border-radius: ${props => props.theme.smallBorderRadius};
`
