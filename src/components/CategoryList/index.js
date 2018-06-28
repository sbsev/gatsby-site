import React from 'react'

import { List, ListTitle, CategoryLink } from './styles'

const Category = ({ category, active }) => (
  <li>
    <CategoryLink
      active={active}
      to={`/blog` + (category.slug ? `/category/` + category.slug : ``)}
    >
      {category.title}
    </CategoryLink>
  </li>
)

const CategoryList = ({ title, categories, activeCategory }) => (
  <div>
    <ListTitle>{title}</ListTitle>
    <List>
      <Category category={{title: `Alle`}} />
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