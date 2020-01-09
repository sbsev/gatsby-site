import styled, { css } from 'styled-components'

export const Caption = styled.figcaption`
  z-index: 2;
  position: absolute;
  bottom: 0;
  right: 1em;
  font-size: 0.8em;
  transition: 0.3s;
  color: white;
  padding: 0.1em 0.5em;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0.5em 0.5em 0 0;
  a {
    color: ${props => props.theme.lightBlue};
    transition: 0.3s;
    :hover {
      color: ${props => props.theme.orange};
    }
  }
  > p:first-child {
    margin: 0;
  }
  ${props =>
    props.showOnHoverParent &&
    css`
      visibility: hidden;
      opacity: 0;
      ${props.showOnHoverParent}:hover & {
        visibility: visible;
        opacity: 1;
      }
    `}
`
