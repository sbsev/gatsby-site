import styled from 'styled-components'

export const PageBody = styled.article`
  #heads {
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
    margin-top: 2rem;

    p {
      text-align: center;

      img {
        width: 100%;
        max-width: 15rem;
        border-radius: 50%;
        margin: 0;
      }
      em {
        display: block;
      }
      strong {
        display: block;
        font-weight: 200;
      }
    }
  }
`

export default PageBody