import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Global from "../components/Global"
import Slideshow from "../components/Slideshow"
import PageTitle from "../components/PageTitle"
import Scroll from "../components/Scroll"
import PageBody from "../components/PageBody"

import { Title, Subtitle } from "../components/styles/IndexPage"

const IndexPage = ({ data, location }) => {
  const { images, page, updatedAt } = data
  let { title, subtitle, body } = page
  const { excerpt, html } = body && body.remark
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle fillToBottom>
        <Slideshow topDots>
          {images.edges.map(({ node }) => (
            <Img key={node.title} fluid={node.fluid} />
          ))}
        </Slideshow>
        <Title>
          <h1 css="margin-top: 0;">{title}</h1>
          <Subtitle
            dangerouslySetInnerHTML={{ __html: subtitle.remark.html }}
          />
        </Title>
        <Scroll direction="down" to={1} align="center" position="absolute" />
      </PageTitle>
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
