import styled, { css } from 'styled-components'
import { mediaQueries } from 'utils/mediaQueries'
import { colors } from 'utils/theme'

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

export const Main = styled.main`
  margin: calc(3em + 3vh) 0;
  display: grid;
  grid-gap: 0 4vw;
  grid-template-columns: 1fr 1fr minmax(8em, 40em) 1fr 1fr;
  grid-auto-rows: max-content;
  grid-auto-flow: dense;
  ${mediaQueries.minPhablet} {
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
        grid-gap: 1em;
        box-shadow: 0 0 5px gray;
        border-radius: 1em;
        padding: 0.8em;
        ul {
          list-style: disc;
          padding-left: 1.3em;
        }
        > :first-child {
          justify-self: center;
        }
        ${mediaQueries.minPhone} {
          grid-template-columns: auto 1fr;
          > :first-child {
            grid-column: 1;
            grid-row: span 2;
          }
          > :not(:first-child) {
            grid-column: 2;
          }
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
    margin: 0 -50vw;
    padding: 1.5em calc(50vw - 50%);
    > ul {
      padding: 0;
      text-align: center;
      display: flex;
      list-style: none;
      margin: 2em auto;
      ${mediaQueries.maxPhone} {
        flex-direction: column;
      }
      > li {
        flex: 1;
        vertical-align: middle;
        border-radius: 0.5em;
        padding: 0.5em;
        background: ${colors.darkBlue};
        color: white;
        & + li {
          margin-left: 1em;
          ${mediaQueries.maxPhone} {
            flex-direction: column;
            margin-left: 0;
            margin-top: 1em;
          }
        }
        a {
          color: ${colors.green};
          :hover {
            color: ${colors.lightGreen};
          }
        }
      }
    }
    &.alternating {
      li {
        :nth-child(odd) {
          background: ${colors.green};
          color: white;
          a {
            color: ${colors.darkBlue};
            :hover {
              color: ${colors.blue};
            }
          }
        }
      }
    }
    &.blue {
      background: ${colors.darkBlue};
      color: white;
      padding: 1.5em calc(50vw - 50%);
      a {
        color: ${colors.green};
        :hover {
          color: ${colors.lightGreen};
        }
      }
      li {
        background: ${colors.green};
        a {
          color: ${colors.darkBlue};
          :hover {
            color: ${colors.blue};
          }
        }
      }
      &.alternating {
        li {
          :nth-child(odd) {
            background: ${colors.lightBlue};
            color: black;
          }
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
