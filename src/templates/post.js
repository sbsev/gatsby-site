import React, { Fragment } from 'react'
import Helmet from 'react-helmet'
import PostTitle from '../components/PostTitle'
import BlogContent from '../components/BlogContent'

const PostTemplate = props => {
  const { post, site: { meta: { siteTitle, siteUrl } } } = props.data
  return (
    <Fragment>
      <Helmet>
        <title>{`${post.title.title} | ${siteTitle}`}</title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title.title} />
        <meta
          property="og:url"
          content={`${siteUrl}/posts/${post.slug}`}
        />
      </Helmet>
      <PostTitle
        title={post.title.title}
        date={post.date}
        timeToRead={post.body.data.timeToRead}
      />
      <BlogContent dangerouslySetInnerHTML={{ __html: post.body.data.html }} />
    </Fragment>
  )
}

export default PostTemplate

export const pageQuery = graphql`
  query PostBySlug($slug: String!) {
    site {
      meta: siteMetadata {
        siteTitle: title
        siteUrl
      }
    }
    post: contentfulPost(slug: { eq: $slug }) {
      title {
        title
      }
      slug
      date: createdAt(formatString: "MMMM Do, YYYY")
      body {
        data: childMarkdownRemark {
          timeToRead
          html
        }
      }
    }
  }
`