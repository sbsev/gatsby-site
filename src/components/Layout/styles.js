import styled, { injectGlobal } from 'styled-components'

import mediaQuery, { screenSize } from '../../utils/mediaQuery'
import typography from '../../utils/typography'

const { phone, desktop } = screenSize
const {
  fonts,
  minFontSize,
  maxFontSize,
  minLineHeight,
  maxLineHeight,
} = typography

injectGlobal`
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
  a {
    color: inherit;
    text-decoration: none;
  }
  #___gatsby {
    height: 100%;
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    h1 {
      font-size: ${1.1 ** (7 - 1)}em;
    }
    h2 {
      font-size: ${1.1 ** (7 - 2)}em;
    }
    h3 {
      font-size: ${1.1 ** (7 - 3)}em;
    }
    h4 {
      font-size: ${1.1 ** (7 - 4)}em;
    }
    h5 {
      font-size: ${1.1 ** (7 - 5)}em;
    }
    h6 {
      font-size: ${1.1 ** (7 - 6)}em;
    }
  }
`

export const Content = styled.main`
  padding: 3vmin 0;
  display: grid;
  grid-gap: 3vmin;
  grid-template-columns:
    auto auto minmax(auto, ${props => props.theme.maxWidth})
    auto auto;
  grid-auto-rows: max-content;
  > * {
    grid-column: 3;
  }
`
