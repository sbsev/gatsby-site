import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PostTitle from '../components/PostTitle'
import FeaturedImage from '../components/FeaturedImage'

const PostTemplate = props => {
  const { post, site } = props.data
  return (
    <Fragment>
      <Helmet>
        <title>{`${post.title.title} | ${site.meta.title}`}</title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title.title} />
        <meta property="og:url" content={`${site.meta.url}/posts/${post.slug}`} />
      </Helmet>
      {post.featuredImage &&
        <FeaturedImage src={post.featuredImage.file.url} alt={post.featuredImage.title} />
      }
      <PostTitle
        title={post.title.title}
        date={post.date}
        timeToRead={post.body.data.timeToRead}
      />
      <article dangerouslySetInnerHTML={{ __html: post.body.data.html }} />
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
    site {
      meta: siteMetadata {
        title
        url: siteUrl
      }
    }
    post: contentfulPost(slug: { eq: $slug }) {
      ...postFields
    }
  }
`