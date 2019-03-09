import { graphql } from "gatsby"

export const query = graphql`
  fragment articleFields on ContentfulWikiArticle {
    title
    slug
    body {
      remark: childMarkdownRemark {
        html
        excerpt
        headings {
          value
          depth
        }
      }
    }
    updatedAt(formatString: "D. MMM YYYY", locale: "de")
    section {
      title
      slug
    }
    subsection {
      title
      slug
    }
  }
`
