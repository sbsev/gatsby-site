import { graphql } from "gatsby"

export const query = graphql`
  fragment slideFields on ContentfulSlide {
    title
    subtitle {
      remark: childMarkdownRemark {
        html
      }
    }
    showText
    textBg
    img {
      fluid(maxWidth: 1800) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`
