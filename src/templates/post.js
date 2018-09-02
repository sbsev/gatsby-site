import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostTitle from '../components/PostTitle'
import PageBody from '../components/PageBody'

const PostTemplate = ({ data, location }) => {
  const {
    title: { title },
    date,
    body,
    featuredImage,
  } = data.post
  const { timeToRead, html, excerpt } = body.data
  const titleData = { featuredImage, title, date, timeToRead }
  return (
    <Layout pageTitle={title} path={location.pathname} description={excerpt}>
      <PostTitle {...titleData} />
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
    category {
      title
    }
    tags
    date(formatString: "D. MMMM YYYY", locale: "de")
    featuredImage {
      file {
        url
        fileName
        contentType
      }
      title
      description
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
