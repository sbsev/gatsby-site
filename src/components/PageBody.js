import styled from 'styled-components'

const imageGrid = css => `
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 12rem));
  margin: 2rem 0;

  h1, h2, h3, h4, h5, h6 {
    grid-column: 1/-1;
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
    }
  }

  ${css}
`

export const PageBody = styled.article`
  #heads, #alumni {
    ${imageGrid(`
      img {
        border-radius: 50%;
      }
    `)}
  }

  #partners {
    ${imageGrid()}
  }

  .side-by-side {
    display: grid;
    grid-gap: 1rem;
    margin: 2rem 0;
    grid-auto-flow: column;
    ${'' /* .gatsby-resp-image-link,
    .gatsby-resp-image-wrapper,
    .gatsby-resp-image-background-image,
    .gatsby-resp-image-image,
    img {
      height: 100%;
      object-fit: cover;
    } */}
  }

  .multi-col-list ul, .multi-col-list ol {
    display: grid;
    grid-gap: 0 2rem;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  }
`

export default PageBody