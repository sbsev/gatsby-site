import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import { UserEdit } from 'styled-icons/fa-solid/UserEdit'
import { Email } from 'styled-icons/material/Email'
import { ExternalLinkAlt } from 'styled-icons/fa-solid/ExternalLinkAlt'
import { Calendar } from 'styled-icons/octicons/Calendar'
import { Timer } from 'styled-icons/material/Timer'

import { Post, Title, Meta, AuthorPhoto } from './styles'

const PostExcerpt = ({ post, iconSize }) => {
  const { featuredImage, slug, title, author, date, categories, body } = post
  const { timeToRead, excerpt } = body.data
  return (
    <Post>
      {featuredImage && (
        <Link to={'/blog/' + slug}>
          <Img fluid={featuredImage.fluid} alt={featuredImage.title} />
        </Link>
      )}
      <div>
        <Title>
          <Link to={'/blog/' + slug}>{title.title}</Link>
        </Title>
        <Meta>
          <AuthorPhoto fixed={author.photo.fixed} alt={author.name} />
          <div>
            <UserEdit size={iconSize} /> &nbsp;{author.name}
            {author.homepage && (
              <a href={author.homepage}>
                &nbsp;
                <ExternalLinkAlt size={iconSize} />
              </a>
            )}
            {author.email && (
              <a href={`mailto:${author.email}`}>
                &nbsp; <Email size={iconSize} />
              </a>
            )}
          </div>
          <div>
            <Calendar size={iconSize} /> &nbsp;{date}
          </div>
          <div>
            <Timer size={iconSize} /> &nbsp;{timeToRead} Min Lesezeit
          </div>
        </Meta>
        <div>
          <span>Kategorien: </span>
          {categories.map((category, index) => (
            <Fragment key={category.slug}>
              {!!index && ', '}
              <Link to={`blog/` + category.slug}>{category.title}</Link>
            </Fragment>
          ))}
        </div>
        <span dangerouslySetInnerHTML={{ __html: excerpt }} />
      </div>
    </Post>
  )
}

export default PostExcerpt

PostExcerpt.propTypes = {
  post: PropTypes.shape({
    featuredImage: PropTypes.object,
    title: PropTypes.object.isRequired,
    slug: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      homepage: PropTypes.string,
      photo: PropTypes.object.isRequired,
    }).isRequired,
    date: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
    body: PropTypes.object.isRequired,
  }),
  iconSize: PropTypes.string.isRequired,
}

PostExcerpt.defaultProps = {
  iconSize: '1em',
}
