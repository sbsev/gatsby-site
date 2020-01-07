import { Link } from 'gatsby'
import React, { Fragment } from 'react'
import PostMeta from '../PostMeta'
import { Cover, Post, Tag, Title } from './styles'

export default function PostExcerpt({ post, activeTag, setTag }) {
  const { cover, slug, title, author, date, tags, body } = post
  const { timeToRead, excerpt } = body.remark
  if (cover && !cover.fluid) cover.src = cover.file.url
  return (
    <Post>
      {cover && (
        <Link to={slug}>
          <Cover {...cover} alt={cover.title} />
        </Link>
      )}
      <main>
        <Title>
          <Link to={slug}>{title}</Link>
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
