import { createGlobalStyle } from 'styled-components'
import mediaQuery, { screens } from 'utils/mediaQuery'
import typography from 'utils/typography'
import theme from 'utils/theme'

const { phone, desktop } = screens
const { fonts, minFontSize, maxFontSize, minLineHeight, maxLineHeight } = typography

const btnColors = [`blue`, `green`, `orange`]
  .map(
    color =>
      `&.${color} { background: ${theme[color]}; :hover { background: ${
        theme[`light` + color.charAt(0).toUpperCase() + color.slice(1)]
      } } }`
  )
  .join(`\n`)

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: ${fonts};
    font-size: ${minFontSize}em;
    line-height: ${minLineHeight}em;
    ${mediaQuery.minPhone} {
      font-size: calc(${minFontSize}em + (${maxFontSize} - ${minFontSize}) * ((100vw - ${phone}em) / (${desktop} - ${phone})));
      line-height: calc(${minLineHeight}em + (${maxLineHeight} - ${minLineHeight}) * ((100vw - ${phone}em) / (${desktop} - ${phone})));
    }
    ${mediaQuery.minDesktop} {
      font-size: ${maxFontSize}em;
      line-height: ${maxLineHeight}em;
    }
  }
  h1, h2, h3, h4, h5, h6 {
    line-height: initial;
    /* margin-top: 1em; */
    margin-bottom: 0.2em;
  }
  ${[...Array(6)].map((_, idx) => `h${idx + 1} { font-size: ${2 - 0.2 * idx}em; }`)}
  a {
    text-decoration: none;
    color: ${theme.blue};
    :hover {
      color: ${props => props.theme.lightBlue};
    }
  }
  #gatsby-focus-wrapper {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .btn {
    display: inline-block;
    margin-top: 0.5em;
    background: ${props => props.theme.darkBlue};
    color: white !important;
    border-radius: 0.2em;
    padding: 0.4em 0.6em;
    font-size: ${props => props.size};
    transition: 0.3s;
    ${btnColors}
    a {
      color: white;
    }
    &.block {
      display: block;
      margin: 0 auto;
      width: fit-content;
    }
    :hover {
      transform: scale(1.05);
      background: ${props => props.theme.lightBlue};
    }
    &.block {
      display: block;
      margin: 0 auto;
      width: fit-content;
    }
    &.medium {
      font-size: 1.4em;
    }
    &.large {
      font-size: 1.6em;
      margin: 1.2em auto;
    }
  }
  .inline-img {
    height: 1.6em;
    width: 1.6em;
    display: inline-block;
    vertical-align: middle;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  table td, table th {
    border: 1px solid ${props => props.theme.lightGray};
    padding: 0.4em 0.8em;
  }
  tbody tr:nth-child(odd) {
    background: ${props => props.theme.lightestGray};
  }
  div.scroll {
    overflow: scroll;
    margin: 1em auto;
    border: 1px solid ${props => props.theme.lightGray};
    border-width: 0 1px;
    table td, table th {
      :first-child {
        border-left: none;
      }
      :last-child {
        border-right: none;
      }
    }
  }
`
