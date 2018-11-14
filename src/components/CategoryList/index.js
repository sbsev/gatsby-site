import React from 'react'

import { Container, List, CategoryIcon, CategoryLink } from './styles'

const Category = ({ category: { title, slug, icon } }) => (
  <CategoryLink activeClassName="active" to={`/blog/` + slug}>
    <CategoryIcon src={icon.file.url} alt={icon.title} />
    {title}
  </CategoryLink>
)

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
