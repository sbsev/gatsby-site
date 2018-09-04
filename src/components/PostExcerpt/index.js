import React from 'react'

import {
  Title,
  TitleLink,
  Meta,
  Categories,
  Category,
  FeaturedImage,
  AuthorPhoto,
  UserEdit,
  AuthorPage,
  Email,
  Date,
  Timer,
} from './styles'

const PostExcerpt = ({ post }) => {
  const { featuredImage, slug, title, author, date, categories, body } = post
  const {
    data: { timeToRead, excerpt },
  } = body
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
            <UserEdit size="1em" /> &nbsp; {author.name}
          </span>
          {author.homepage && (
            <a href={author.homepage}>
              <AuthorPage size="1em" />
            </a>
          )}
          {author.email && (
            <a href={`mailto:${author.email}`}>
              <Email size="1em" />
            </a>
          )}
        </span>
        <span>
          <Date size="1em" /> &nbsp; {date} &nbsp; | &nbsp; <Timer size="1em" />{' '}
          &nbsp; {timeToRead} Min Lesezeit
        </span>
      </Meta>
      <p dangerouslySetInnerHTML={{ __html: excerpt }} />
      <Categories>
        Kategorien:{' '}
        {categories.map(category => (
          <Category key={category.slug} to={category.slug}>
            {category.title}
          </Category>
        ))}
      </Categories>
    </article>
  )
}

export default PostExcerpt
