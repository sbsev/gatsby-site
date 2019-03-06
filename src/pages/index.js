import React from "react"
import { graphql } from "gatsby"

import Global from "../components/Global"
import LandingTitle from "../components/LandingTitle"
import PageBody from "../components/PageBody"

const IndexPage = ({ data, location }) => {
  const { images, page, updatedAt } = data
  let { title, subtitle, body } = page
  const { excerpt, html } = body && body.remark
  subtitle = subtitle.remark.html
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <LandingTitle {...{ title, subtitle, images: images.edges }} />
      <PageBody html={html} updated={updatedAt} />
    </Global>
  )
}

export default IndexPage

export const query = graphql`
  {
    page: contentfulPage(slug: { eq: "/" }) {
      title
      subtitle {
        remark: childMarkdownRemark {
          html
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
    images: allContentfulAsset(
      filter: { file: { fileName: { regex: "/stock/" } } }
      sort: { fields: title, order: ASC }
    ) {
      edges {
        node {
          title
          description
          fluid(quality: 100) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`
