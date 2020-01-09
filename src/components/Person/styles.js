import styled from 'styled-components'
import Image from 'gatsby-image'

export const PersonContainer = styled.div`
  text-align: center;
  line-height: 1.2em;
  position: relative;
`

export const Details = styled.div`
  position: absolute;
  top: 105%;
  padding: 0.5em;
  transform: translateX(-50%);
  left: 50%;
  opacity: 0;
  visibility: hidden;
  background: ${props => props.theme.lightestGray};
  z-index: 2;
  max-width: 90vw;
  min-width: 15em;
  border-radius: 0.5em;
  transition: 0.6s ease-in-out;
  transition-delay: 0.3s;
  display: grid;
  grid-gap: 0.4em;
  ${PersonContainer}:hover & {
    opacity: 1;
    visibility: visible;
  }
  span p:first-child {
    margin: 0;
  }
  address > :not(:first-child) {
    margin-left: 1em;
  }
`

export const Img = styled(Image)`
  border-radius: 50%;
  transition: 0.6s ease-in-out;
  margin-bottom: 0.3em;
  :hover {
    transform: scale(1.05);
  }
`

export const Name = styled.span`
  display: block;
  margin-bottom: 0.2em;
`

export const Remits = styled.span`
  display: block;
  font-weight: lighter;
`
