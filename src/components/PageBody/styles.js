import styled, { css } from 'styled-components'
import mediaQuery from 'utils/mediaQuery'
import { theme } from 'utils/theme'

const grid = ({ gap = `0 2em`, fit = `auto-fill`, minWidth = `7em` } = {}) => css`
  display: grid;
  grid-gap: ${gap};
  grid-template-columns: repeat(${fit}, minmax(${minWidth}, 1fr));
  /* Prevent large images from overflowing. */
  text-align: center;
  img {
    width: 100%;
  }
  /* prettier-ignore */
  h1, h2, h3, h4, h5, h6 {
    grid-column: 1/-1;
    margin-bottom: 0;
  }
  em,
  strong {
    text-align: center;
    display: block;
    font-style: normal;
  }
  strong {
    font-weight: lighter;
  }
`

const bgColors = [
  [`orange`],
  [`yellow`],
  [`lighterGreen`, `green`],
  [`blue`],
  [`lightBlue`, `light-blue`],
  [`darkBlue`, `dark-blue`],
]
  .map(([color, name]) => `&.${name || color} { background: ${theme[color]}; }`)
  .join(`\n`)

export const Main = styled.main`
  margin: calc(3em + 3vh) 0;
  display: grid;
  grid-gap: 0 4vw;
  grid-template-columns: 1fr 1fr minmax(8em, ${props => props.theme.maxWidth}) 1fr 1fr;
  grid-auto-rows: max-content;
  grid-auto-flow: dense;
  ${mediaQuery.minPhablet} {
    > p {
      text-align: justify;
    }
  }
  > * {
    grid-column: 3;
  }
  p > img {
    max-width: 100%;
  }
  .grid {
    ${grid()};
    &.disk-img {
      .gatsby-resp-image-wrapper {
        border-radius: 50% !important;
        overflow: hidden;
      }
      img {
        border-radius: 50%;
      }
    }
  }
  /* For side-by-side images */
  .grid.fit {
    ${grid({ fit: `auto-fit`, minWidth: `12em`, gap: `0 1em` })};
  }
  .multi-col-list ul,
  .multi-col-list ol {
    display: grid;
    grid-gap: 0 2em;
    grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  }
  .left-img-right-text-boxes {
    > ul {
      list-style: none;
      padding: 0;
      display: grid;
      grid-gap: 1em;
      > li {
        display: grid;
        grid-gap: 0 1em;
        grid-template-columns: auto 1fr;
        box-shadow: 0 0 5px gray;
        border-radius: 1em;
        padding: 0.8em;
        ul {
          list-style: disc;
        }
        > :first-child {
          grid-column: 1;
          grid-row: span 10;
        }
        > :not(:first-child) {
          grid-column: 2;
        }
        p {
          margin: 0;
        }
        em.block,
        strong.block {
          display: block;
        }
        em.block {
          font-weight: lighter;
        }
        img:first-child,
        .gatsby-resp-image-wrapper:first-child {
          width: 7em;
          border-radius: 0.5em;
          overflow: hidden;
        }
      }
    }
  }
  .full-width {
    position: relative;
    box-sizing: border-box;
    width: 100vw;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    &.bg {
      padding: 0.5em calc(50vw - 50%);
      color: white;
      ${bgColors}
      &.blue a, &.light-blue a, &.dark-blue a {
        color: ${p => p.theme.green};
        :hover {
          ${p => p.theme.lightGreen};
        }
      }
    }
  }
`

export const Content = styled.div`
  display: contents;
  > * {
    grid-column: 3;
  }
  > *:first-child {
    margin-top: 0;
  }
`

export const Updated = styled.time`
  display: block;
  text-align: right;
  font-size: 0.8em;
  margin-top: 2em;
`

export const Address = styled.address`
  display: block;
  text-align: right;
  font-size: 0.8em;
`
