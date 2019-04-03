import styled, { css } from 'styled-components'
import Image from 'gatsby-image'

export const PageTitleContainer = styled.hgroup`
  position: relative;
  color: ${props => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => props.theme.minHeight || `60vh`};
  flex: 1; /* for filling height between header and footer on 404 page */
  overflow: hidden;
`

const textBg = css`
  background: rgba(0, 0, 0, 0.6);
  border-radius: ${props => props.theme.smallBorderRadius};
  justify-self: center;
  padding: 0.1em 0.4em;
`

export const Title = styled.div`
  text-align: center;
  font-size: calc(1em + 0.5vw);
  margin: 1em;
  max-width: 30em;
  ${props => props.textBg && textBg};
  > * {
    margin: 0.1em 0.2em;
  }
  a {
    color: ${props => props.theme.orange};
    :hover {
      color: ${props => props.theme.lightGreen};
    }
    /* button styles */
    em strong {
      font-style: normal;
      background: ${props => props.theme.orange};
      color: ${props => props.theme.white} !important;
      border-radius: ${props => props.theme.smallBorderRadius};
      padding: 0.3em 0.6em;
      transition: ${props => props.theme.shortTrans};
      display: inline-block;
      :hover {
        background: ${props => props.theme.lightGreen};
      }
    }
  }
`

export const Img = styled(Image).attrs(
  ({ fluid, src }) => !fluid && { as: (src && `img`) || `div` }
)`
  position: absolute !important;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: ${({ theme }) => `linear-gradient(
    10deg,
    ${theme.lightGreen} 0%,
    ${theme.darkBlue} 50%,
    ${theme.lightBlue} 100%
  )`};
  object-fit: cover;
`
