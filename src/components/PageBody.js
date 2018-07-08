import styled from 'styled-components'

const imageGrid = (props = {}) => `
  display: grid;
  grid-gap: ${props.gridGap || `2rem`};
  grid-template-columns: repeat(auto-fit, minmax(5rem, 12rem));
  margin-top: 2rem;

  h1, h2, h3, h4, h5, h6 {
    grid-column: 1/-1;
  }

  p {
    text-align: center;

    img {
      width: 100%;
      border-radius: ${props.borderRadius || `0`};
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
`

export const PageBody = styled.article`
  #heads, #alumni {
    ${imageGrid({ borderRadius: `50%` })}
  }

  #partners {
    ${imageGrid()}
  }

  .side-by-side {
    ${imageGrid({ gridGap: `1rem` })}
  }

  .multi-col-list ul, .multi-col-list ol {
    display: grid;
    grid-gap: 0 2rem;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  }
`

export default PageBody