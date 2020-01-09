import Image from 'gatsby-image'
import styled from 'styled-components'

export const PageTitleDiv = styled.hgroup`
  position: relative;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  flex: 1; /* For filling height between header and footer on 404 page */
  overflow: hidden;
`

export const Title = styled.div`
  text-align: center;
  position: absolute;
  font-size: calc(1em + 0.5vw);
  margin: 1em;
  max-width: 30em;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0.5em;
  padding: 0.4em 0.8em;
  a {
    color: ${props => props.theme.lighterGreen};
  }
  > * {
    margin: 0;
  }
`

export const Img = styled(Image).attrs(
  ({ fluid, src }) => !fluid && src && { as: `img` }
)`
  position: absolute !important;
  width: 100%;
  height: ${({ as }) => as !== `img` && `100%`};
  background: ${({ theme }) => `linear-gradient(
    10deg,
    ${theme.lighterGreen} 0%,
    ${theme.darkBlue} 50%,
    ${theme.lightBlue} 100%
  )`};
`
