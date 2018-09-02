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
      profilePhoto {
        fixed(width: 100) {
          src
        }
      }
    }
    category {
      title
    }
    tags
    date(formatString: "D. MMMM YYYY", locale: "de")
    featuredImage {
      file {
        url
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
