import React from 'react'

import { List, ListTitle, CategoryIcon, CategoryLink } from './styles'

const Category = ({ category }) => {
  const { title, slug, icon } = category
  const link = `/blog/` + (slug === `alle` ? `` : slug)
  return <CategoryLink
    exact
    activeClassName
    to={link}
  >
    <CategoryIcon src={icon.file.url} alt={icon.title}/>
    {title}
  </CategoryLink>
}

const CategoryList = ({ title, categories }) => (
  <div>
    <ListTitle>{title}</ListTitle>
    <List>
      {categories.map(category =>
        <Category
          key={category.node.slug}
          category={category.node}
        />
      )}
    </List>
  </div>
)

export default CategoryList