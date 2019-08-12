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
        fluid(maxWidth: 200) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
    tags {
      title
      slug
    }
    date(formatString: "D. MMM YYYY", locale: "de")
    cover {
      ...image
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
