import React from "react"
import { graphql } from "gatsby"

import Global from "../components/Global"
import PostTitle from "../components/PostTitle"
import PageBody from "../components/styles/PageBody"

const PostTemplate = ({ data, location }) => {
  const { title, body } = data.post
  const { html, excerpt } = body.remark
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PostTitle {...data} />
      <PageBody dangerouslySetInnerHTML={{ __html: html }} />
    </Global>
  )
}

export default PostTemplate

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
      slug
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
  query($slug: String!) {
    post: contentfulPost(slug: { eq: $slug }) {
      ...postFields
    }
  }
`
