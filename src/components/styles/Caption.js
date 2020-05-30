import styled, { css } from 'styled-components'

export const Caption = styled.figcaption`
  z-index: 2;
  position: absolute;
  bottom: 0;
  right: 1em;
  font-size: 0.8em;
  transition: 0.3s;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 0.5em 0.5em 0 0 !important;
  margin: 0 !important;
  a {
    color: ${p => p.theme.lightBlue};
    transition: 0.3s;
    :hover {
      color: ${p => p.theme.orange};
    }
  }
  > p:first-child {
    margin: 0;
  }
  ${p =>
    p.showOnHoverParent &&
    css`
      visibility: hidden;
      opacity: 0;
      ${p.showOnHoverParent}:hover & {
        visibility: visible;
        opacity: 1;
      }
    `}
`
