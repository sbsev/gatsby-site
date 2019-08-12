import { graphql } from 'gatsby'

export const query = graphql`
  fragment image on ContentfulAsset {
    title
    alt: description
    fluid {
      ...GatsbyContentfulFluid_withWebp
    }
    file {
      url
    }
  }
`
