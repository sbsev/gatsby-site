import styled from 'styled-components'

export const PageTitleDiv = styled.hgroup`
  position: relative;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 65vh;
  flex: 1; /* for filling height between header and footer on 404 page */
  overflow: hidden;
`

export const Title = styled.div`
  text-align: center;
  font-size: calc(1em + 0.5vw);
  margin: 1em;
  max-width: 30em;
  padding: 0.1em 0.4em;
  z-index: 2;
  a {
    color: ${props => props.theme.lighterGreen};
  }
  > * {
    background: rgba(0, 0, 0, 0.7);
    border-radius: ${props => props.theme.smallBorderRadius};
    justify-self: center;
    padding: 0.1em 0.4em;
  }
`
