import styled, { css } from 'styled-components'
import { BookContent } from 'styled-icons/boxicons-regular'
import { Close as Cross } from 'styled-icons/material'
import { mediaQueries } from 'utils/mediaQueries'

export const TocDiv = styled.aside`
  height: max-content;
  z-index: 1;
  line-height: 2em;
  right: 1em;
  max-width: 20em;
  max-height: 80vh;
  /* Prevents child nav from overflowing: https://stackoverflow.com/a/38066257 */
  display: flex;
  flex-direction: column;
  background: white;
  padding: 0.7em 0.8em 0;
  border-radius: 0.5em;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  nav {
    max-height: 73vh;
    overflow-y: scroll;
    overscroll-behavior: none;
    ${mediaQueries.minLaptop} {
      mask-image: linear-gradient(
        to bottom,
        transparent,
        black 20px,
        black 95%,
        transparent
      );
    }
  }
  ${mediaQueries.maxLaptop} {
    position: fixed;
    bottom: 1em;
    left: 1em;
    ${p => !p.open && `height: 0;`};
    visibility: ${p => (p.open ? `visible` : `hidden`)};
    opacity: ${p => (p.open ? 1 : 0)};
    transition: 0.3s;
  }
  ${mediaQueries.minLaptop} {
    font-size: 0.85em;
    grid-column: 4/-1;
    grid-row: span 10;
    position: sticky;
    top: 7em;
  }
`

export const Title = styled.strong`
  margin: 0;
  padding-bottom: 0.5em;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-template-columns: auto auto 1fr;
  font-size: 1.8em;
`

export const TocLink = styled.a`
  cursor: pointer;
  color: ${p => !p.active && `black`};
  font-weight: ${p => p.active && `bold`};
  display: block;
  margin: 0.2em 0 0.4em;
  margin-left: ${p => p.depth + `em`};
  border-top: ${({ theme, depth }) =>
    `1px solid ` + (depth === 0 ? theme.gray : theme.lightGray)};
  :hover {
    color: ${p => p.theme.lighterGreen};
  }
`

export const TocIcon = styled(BookContent)`
  width: 1em;
  margin-right: 0.2em;
`

const openerCss = css`
  position: fixed;
  bottom: calc(1vh + 1em);
  left: 0;
  padding: 0.5em 0.6em 0.5em 0.3em;
  background: white;
  z-index: 1;
  border-radius: 0 50% 50% 0;
  transform: translate(${p => (p.open ? `-150%` : 0)});
  border: 1px solid;
  border-left: none;
`

const closerCss = css`
  margin-left: 1em;
  border: 1px solid;
  border-radius: 50%;
`

export const TocToggle = styled(Cross).attrs(props => ({
  as: props.opener && BookContent,
  size: props.opener ? `1.8em` : `1.2em`,
}))`
  transition: 0.3s;
  justify-self: end;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
  ${mediaQueries.minLaptop} {
    display: none;
  }
  ${p => (p.opener ? openerCss : closerCss)};
`
