import styled, { css } from 'styled-components'
import Img from 'gatsby-image'

const inExcerpt = css`
  display: grid;
  grid-gap: 0 1em;
  grid-template-areas:
    'photo author'
    'photo date'
    'photo readtime';
  grid-template-columns: max-content 1fr;
  margin-bottom: 0.5em;
  align-items: center;
`

const inTitle = css`
  margin: 3em auto 0 !important;
  justify-content: center;
  max-width: 80vw !important;
  width: max-content;
  display: flex;
  flex-wrap: wrap;
  font-size: 0.9em;
  > * {
    display: flex;
    align-items: center;
  }
  > :not(:last-child) {
    margin-right: 1em;
  }
  .gatsby-image-wrapper {
    width: 2.5em;
    height: 2.5em;
  }
`

export const Meta = styled.div`
  ${props => (props.inTitle ? inTitle : inExcerpt)};
`

export const AuthorPhoto = styled(Img)`
  border-radius: 50%;
  grid-area: photo;
  width: 4em;
  height: 4em;
`
