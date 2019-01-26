import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Img from "gatsby-image"

import { UserEdit } from "styled-icons/fa-solid/UserEdit"
import { Email } from "styled-icons/material/Email"
import { ExternalLinkAlt } from "styled-icons/fa-solid/ExternalLinkAlt"
import { Calendar } from "styled-icons/octicons/Calendar"
import { Timer } from "styled-icons/material/Timer"

import { Post, Title, Meta, AuthorPhoto, Tag } from "./styles"

const PostExcerpt = ({ post, activeTag, setTag }) => {
  const { cover, slug, title, author, date, tags, body } = post
  const { timeToRead, excerpt } = body.data
  return (
    <Post>
      {cover && cover.fluid && (
        <Link to={`/blog/` + slug}>
          <Img fluid={cover.fluid} alt={cover.title} />
        </Link>
      )}
      <main>
        <Title>
          <Link to={`/blog/` + slug}>{title}</Link>
        </Title>
        <Meta>
          <AuthorPhoto fixed={author.photo.fixed} alt={author.name} />
          <div>
            <UserEdit size="1em" /> &nbsp;{author.name}
            {author.homepage && (
              <a href={author.homepage}>
                &nbsp;
                <ExternalLinkAlt size="1em" />
              </a>
            )}
            {author.email && (
              <a href={`mailto:${author.email}`}>
                &nbsp; <Email size="1em" />
              </a>
            )}
          </div>
          <div>
            <Calendar size="1em" /> &nbsp;{date}
          </div>
          <div>
            <Timer size="1em" /> &nbsp;{timeToRead} Min Lesezeit
          </div>
        </Meta>
        <div>
          <span>Tags: </span>
          {tags.map(({ title }, index) => (
            <Fragment key={title}>
              {!!index && `, `}
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
