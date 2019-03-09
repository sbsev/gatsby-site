import { graphql } from 'gatsby'

export const query = graphql`
  fragment postFields on ContentfulPost {
    slug
    title
    author {
      name
      email
      homepage
      photo {
        fixed(width: 50) {
          ...GatsbyContentfulFixed_withWebp
        }
      }
    }
    tags {
      title
    }
    date(formatString: "D. MMM YYYY", locale: "de")
    cover {
      fluid {
        ...GatsbyContentfulFluid_withWebp
      }
      title
    }
    body {
      remark: childMarkdownRemark {
        html
        timeToRead
        excerpt
      }
    }
  }
`
