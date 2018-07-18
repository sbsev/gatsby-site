import React, { Fragment } from 'react'

import Helmet from '../components/Helmet'
import PostTitle from '../components/PostTitle'
import PageBody from '../components/PageBody'
import FeaturedImage from '../components/FeaturedImage'

const PostTemplate = ({ data, location }) => {
  const { post, site } = data
  const { title: { title }, date, body, featuredImage } = post
  const { timeToRead, html, excerpt } = body.data
  const path = location.pathname
  return (
    <Fragment>
      <Helmet pageTitle={title} site={site} path={path} description={excerpt} />
      {featuredImage &&
        <FeaturedImage src={featuredImage.file.url} alt={featuredImage.title} />
      }
      <PostTitle title={title} date={date} timeToRead={timeToRead} />
      <PageBody dangerouslySetInnerHTML={{ __html: html }} />
    </Fragment>
  )
}

export default PostTemplate

export const postFields = graphql`
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
`

export const postQuery = graphql`
  query PostBySlug($slug: String!) {
    ...siteMetaQuery
    post: contentfulPost(slug: { eq: $slug }) {
      ...postFields
    }
  }
`