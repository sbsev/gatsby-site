import Image from 'gatsby-image'
import styled from 'styled-components'

export const PageTitleDiv = styled.hgroup`
  position: relative;
  z-index: 1; /* To allow clicking slideshow dots on landing page. */
  color: white;
  /* Use flex instead of grid. Else Safari messes up vertical alignment of children. */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  min-height: 20em;
  overflow: hidden;
  flex: 1; /* For filling height between header and footer on 404 page */
  text-align: center;
  box-shadow: 0 0 6px grey;
  font-size: calc(1em + 0.4vw);
  /* Exclude the cover image/slideshow. */
  > :not(:first-child) {
    align-self: center;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 0.5em;
    padding: 0.2em 0.4em;
    margin: 2em;
    max-width: 30em;
  }
  a {
    color: ${p => p.theme.green};
  }
  .btn a {
    color: white;
  }
  ul,
  ol {
    justify-content: center;
    display: grid;
    text-align: left;
  }
`

export const Img = styled(Image).attrs(
  ({ fluid, src }) => !fluid && src && { as: `img` }
)`
  position: absolute !important;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
`
