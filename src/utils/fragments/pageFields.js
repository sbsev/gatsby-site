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
    coverProps {
      fillToBottom
      showDownArrow
    }
    body {
      remark: childMarkdownRemark {
        excerpt
        html
      }
    }
    richBody {
      richBody
    }
    updatedAt(formatString: "D. MMM YYYY", locale: "de")
  }
`
