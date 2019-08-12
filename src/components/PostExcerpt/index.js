import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import PostMeta from '../PostMeta'
import { Cover, Post, Tag, Title } from './styles'

const PostExcerpt = ({ post, activeTag, setTag }) => {
  const { cover, slug, title, author, date, tags, body } = post
  const { timeToRead, excerpt } = body.remark
  if (cover && cover.fluid && !cover.fluid.src) {
    cover.src = cover.file.url
    delete cover.fluid
  }
  return (
    <Post>
      {cover && (
        <Link to={`/blog/` + slug}>
          <Cover {...cover} alt={cover.title} css="height: 15em;" />
        </Link>
      )}
      <main>
        <Title>
          <Link to={`/blog/` + slug}>{title}</Link>
        </Title>
        <PostMeta {...{ author, date, timeToRead }} />
        <div>
          <span>Tags: </span>
          {tags.map(({ title }, index) => (
            <Fragment key={title}>
              {index > 0 && `, `}
              <Tag active={activeTag === title} onClick={() => setTag(title)}>
                {title}
              </Tag>
            </Fragment>
          ))}
        </div>
        <span dangerouslySetInnerHTML={{ __html: excerpt }} />
      </main>
    </Post>
  )
}

export default PostExcerpt

PostExcerpt.propTypes = {
  post: PropTypes.shape({
    cover: PropTypes.object,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      homepage: PropTypes.string,
      photo: PropTypes.object.isRequired,
    }).isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
    body: PropTypes.object.isRequired,
  }),
}
