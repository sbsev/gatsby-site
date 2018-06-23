import styled from 'styled-components'
import mediaQuery from '../utils/mediaQuery'

const BlogContent = styled.div`
  .gatsby-highlight {
    margin: 0 0 2rem;
    transition: margin 0.2s ease-in-out;
  }
  ${mediaQuery.minPhone} {
    .gatsby-highlight {
      margin: 0 2rem 2rem;
    }
  }
  .gatsby-resp-image-figcaption {
    margin: 0.25rem;
    text-align: center;
    font-weight: 200;
    font-style: italic;
  }
`

export default BlogContent
