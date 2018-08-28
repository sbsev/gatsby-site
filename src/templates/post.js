import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PostTitle from '../components/PostTitle'
import PageBody from '../components/PageBody'
import FeaturedImage from '../components/FeaturedImage'

const PostTemplate = ({ data, location }) => {
  const {
    title: { title },
    date,
    body,
    featuredImage,
  } = data.post
  const { timeToRead, html, excerpt } = body.data
  const path = location.pathname
  return (
    <Layout pageTitle={title} path={path} description={excerpt}>
      {featuredImage && (
        <FeaturedImage src={featuredImage.file.url} alt={featuredImage.title} />
      )}
      <PostTitle title={title} date={date} timeToRead={timeToRead} />
      <PageBody dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  )
}

export default PostTemplate

export const postQuery = graphql`
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
