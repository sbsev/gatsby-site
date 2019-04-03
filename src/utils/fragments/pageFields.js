import { graphql } from 'gatsby'

export const query = graphql`
  fragment pageFields on ContentfulPage {
    title
    subtitle {
      remark: childMarkdownRemark {
        html
      }
    }
    cover {
      ...slideFields
    }
    titleHeight
    body {
      remark: childMarkdownRemark {
        excerpt
        html
      }
    }
    updatedAt(formatString: "D. MMM YYYY", locale: "de")
  }
`
