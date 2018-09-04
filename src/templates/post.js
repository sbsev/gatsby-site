import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostTitle from '../components/PostTitle'
import PageBody from '../components/PageBody'

const PostTemplate = ({ data, location }) => {
  const {
    title: { title },
    body,
  } = data.post
  const { html, excerpt } = body.data
  return (
    <Layout pageTitle={title} path={location.pathname} description={excerpt}>
      <PostTitle {...data} />
      <PageBody dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default PostTemplate

export const query = graphql`
  fragment postFields on ContentfulPost {
    slug
    title {
      title
    }
    author {
      name
      email
      homepage
      photo {
        fixed(width: 100) {
          ...GatsbyContentfulFixed_withWebp
        }
      }
    }
    categories {
      title
      slug
    }
    date(formatString: "D. MMMM YYYY", locale: "de")
    featuredImage {
      fluid {
        ...GatsbyContentfulFluid_withWebp
      }
      title
    }
    body {
      data: childMarkdownRemark {
        html
        timeToRead
        excerpt(pruneLength: 250)
      }
    }
  }
  query($slug: String!) {
    post: contentfulPost(slug: { eq: $slug }) {
      ...postFields
    }
  }
`
