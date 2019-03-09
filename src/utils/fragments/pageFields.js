import { graphql } from "gatsby"

export const query = graphql`
  fragment pageFields on ContentfulPage {
    title
    subtitle {
      remark: childMarkdownRemark {
        html
      }
    }
    cover {
      title
      img {
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
    body {
      remark: childMarkdownRemark {
        excerpt
        html
      }
    }
    updatedAt(formatString: "D. MMM YYYY", locale: "de")
  }
`
