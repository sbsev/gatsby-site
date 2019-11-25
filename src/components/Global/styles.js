import { createGlobalStyle } from 'styled-components'
import mediaQuery, { screens } from '../../utils/mediaQuery'
import typography from '../../utils/typography'

const { phone, desktop } = screens
const { fonts, minFontSize, maxFontSize, minLineHeight, maxLineHeight } = typography

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
  }
  a {
    text-decoration: none;
    color: ${props => props.theme.blue};
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
    margin: 0.5em;
    background: ${p => p.theme.darkBlue};
    color: white !important;
    a {
      color: white !important;
    }
    border-radius: 0.2em;
    padding: 0.4em 0.6em;
    transition: 0.3s;
    :hover {
      transform: scale(1.03);
      background: ${p => p.theme.blue};
    }
    &.green {
      background: ${p => p.theme.green};
      :hover {
        background: ${p => p.theme.lightGreen};
      }
    }
    &.orange {
      background: ${p => p.theme.orange};
      :hover {
        background: ${p => p.theme.lightOrange};
      }
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
