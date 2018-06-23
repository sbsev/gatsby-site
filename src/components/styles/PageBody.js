import styled from 'styled-components'

import mediaQuery from '../../utils/mediaQuery'

const imageGrid = css => `
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fill, minmax(8em, 1fr));
  margin: 2em 0;
  h3 {
    grid-column: 1/-1;
    text-align: center;
    margin-bottom: 0;
  }
  p {
    text-align: center;
    margin: 0;
    img {
      width: 100%;
    }
    em {
      display: block;
      font-style: normal;
    }
    strong {
      display: block;
      font-weight: 200;
      font-size: 0.9em;
    }
  }
  ${css}
`

const PageBody = styled.article`
  margin-top: ${props => props.isLanding && `calc(2em + 3vh)`};
  ${mediaQuery.minPhablet} {
    text-align: justify;
  }

  .img-small {
    max-width: 16em;
    margin: auto;
  }

  #heads,
  #alumni {
    ${imageGrid(`
      .gatsby-resp-image-wrapper {
        border-radius: 50%;
        overflow: hidden;
      }
      img {
        border-radius: 50%;
      }
    `)};
  }

  #partners {
    ${imageGrid()};
  }

  .image-row {
    display: grid;
    grid-gap: 0.7em;
    grid-auto-flow: column;
    > * {
      overflow: hidden;
      border-radius: ${props => props.theme.smallBorderRadius};
    }
  }

  .multi-col-list ul,
  .multi-col-list ol {
    display: grid;
    grid-gap: 0 2em;
    grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  }
`

export default PageBody
