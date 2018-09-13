import React from 'react'
import PropTypes from 'prop-types'

import { UserEdit } from 'styled-icons/fa-solid/UserEdit'
import { Email } from 'styled-icons/material/Email'
import { ExternalLinkAlt } from 'styled-icons/fa-solid/ExternalLinkAlt'
import { Calendar as Date } from 'styled-icons/octicons/Calendar'
import { Timer } from 'styled-icons/material/Timer'

import {
  Title,
  TitleLink,
  Meta,
  Categories,
  Category,
  FeaturedImage,
  AuthorPhoto,
} from './styles'

const PostExcerpt = ({ post, iconSize }) => {
  const { featuredImage, slug, title, author, date, categories, body } = post
  const { timeToRead, excerpt } = body.data
  return (
    <article>
      {featuredImage && (
        <FeaturedImage fluid={featuredImage.fluid} alt={featuredImage.title} />
      )}
      <Title>
        <TitleLink to={'/blog/' + slug}>{title.title}</TitleLink>
      </Title>
      <Meta>
        <AuthorPhoto fixed={author.photo.fixed} alt={author.name} />
        <span>
          <span>
            <UserEdit size={iconSize} /> &nbsp; {author.name}
          </span>
          {author.homepage && (
            <a href={author.homepage}>
              <ExternalLinkAlt size={iconSize} />
            </a>
          )}
          {author.email && (
            <a href={`mailto:${author.email}`}>
              <Email size={iconSize} />
            </a>
          )}
        </span>
        <span>
          <Date size={iconSize} /> &nbsp; {date} &nbsp; | &nbsp;{' '}
          <Timer size={iconSize} /> &nbsp; {timeToRead} Min Lesezeit
        </span>
      </Meta>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />
      <Categories>
        <span>Kategorien: </span>
        {categories.map(category => (
          <Category key={category.slug} to={`blog/` + category.slug}>
            {category.title}
          </Category>
        ))}
      </Categories>
    </article>
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
