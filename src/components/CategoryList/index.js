import React from 'react'

import { Container, List, CategoryIcon, CategoryLink } from './styles'

const Category = ({ category }) => {
  const { title, slug, icon } = category
  const link = `/blog/` + (slug === `alle` ? `` : slug)
  return (
    <CategoryLink exact activeClassName="active" to={link}>
      <CategoryIcon src={icon.file.url} alt={icon.title} />
      {title}
    </CategoryLink>
  )
}

const CategoryList = ({ title, categories }) => (
  <Container>
    <h1>{title}</h1>
    <List>
      {categories.map(category => (
        <Category key={category.node.slug} category={category.node} />
      ))}
    </List>
  </Container>
)

export default CategoryList
