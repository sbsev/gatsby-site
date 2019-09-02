import styled from 'styled-components'
import Image from 'gatsby-image'

export const Img = styled(Image).attrs(
  ({ fluid, src }) => !fluid && { as: src ? `img` : `div` }
)`
  position: absolute !important;
  width: 100%;
  height: 100%;
  z-index: 1;
  object-fit: cover;
  background: ${({ theme }) => `linear-gradient(
    10deg,
    ${theme.lightGreen} 0%,
    ${theme.darkBlue} 50%,
    ${theme.lightBlue} 100%
  )`};
`

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

export const Middle = styled.div`
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  bottom: 1%;
  right: 0.3%;
  text-align: center;
  ${Container}:hover & {
    opacity: 0.75;
  }
  z-index: 1;
`

export const Text = styled.div`
  background-color: ${props => props.theme.darkBlue};
  color: white;
  font-size: 16px;
  padding: 2px 10px 2px 10px;
  border: none;
  border-radius: 5px;
  font-weight: 500;
`
