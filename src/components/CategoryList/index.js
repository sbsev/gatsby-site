import React from 'react'

import { List, ListTitle, CategoryIcon, CategoryLink } from './styles'

const Category = ({ category, active }) => (
  <CategoryLink
    active={active}
    to={`/blog/` + category.slug}
  >
    <CategoryIcon src={category.icon.file.url} alt={category.icon.title}/>
    {category.title}
  </CategoryLink>
)

const CategoryList = ({ title, categories, activeCategory }) => (
  <div>
    <ListTitle>{title}</ListTitle>
    <List>
      {categories.map(category =>
        <Category
          key={category.node.slug}
          category={category.node}
          active={category.node.slug === activeCategory}
        />
      )}
    </List>
  </div>
)

export default CategoryList