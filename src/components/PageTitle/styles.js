import styled, { css } from "styled-components"
import Image from "gatsby-image"

export const PageTitleContainer = styled.hgroup`
  position: relative;
  color: ${props => props.theme.white};
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  flex: 1; /* for filling height between header and footer on 404 page */
  overflow: hidden;
`

const backdrop = css`
  > * {
    background: rgba(0, 0, 0, 0.7);
    border-radius: ${props => props.theme.smallBorderRadius};
    justify-self: center;
    padding: 0.1em 0.4em;
  }
`

export const Title = styled.div`
  text-align: center;
  font-size: calc(1em + 0.5vw);
  margin: 1em;
  ${props => props.backdrop && backdrop};
`

export const Img = styled(Image).attrs(
  ({ fluid, src }) => !fluid && { as: (src && `img`) || `div` }
)`
  position: absolute !important;
  z-index: -1;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => `linear-gradient(
    10deg,
    ${theme.lightGreen} 0%,
    ${theme.darkBlue} 50%,
    ${theme.lightBlue} 100%
  )`};
  object-fit: cover;
`
