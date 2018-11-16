import React from 'react'

import { Container, List, CategoryIcon, CategoryLink } from './styles'

const Category = ({ category: { title, slug, icon } }) => (
  <CategoryLink activeClassName="active" to={`/blog/` + slug}>
    <CategoryIcon src={icon.file.url} alt={icon.title} />
    {title}
  </CategoryLink>
)

const CategoryList = ({ title = `Kategorien`, categories }) => (
  <Container>
    <h2>{title}</h2>
    <List>
      {categories.map(category => (
        <Category key={category.node.slug} category={category.node} />
      ))}
    </List>
  </Container>
)

export default CategoryList
