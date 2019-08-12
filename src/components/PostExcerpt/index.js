import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import PostMeta from '../PostMeta'
import { Cover, Post, Tag } from './styles'

export default function PostExcerpt({ post, activeTag, setTag }) {
  const { cover, slug, title, author, date, tags, body } = post
  const { timeToRead, excerpt } = body.remark
  if (cover && !cover.fluid) cover.src = cover.file.url
  return (
    <Post>
      {cover && (
        <Link to={`/blog/` + slug}>
          <Cover {...cover} alt={cover.title} css="height: 15em;" />
        </Link>
      )}
      <main>
        <h2>
          <Link to={slug}>{title}</Link>
        </h2>
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
