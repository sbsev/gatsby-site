import React, { useState } from 'react'

import { TagGrid, Toggle, Tag, TagsIcon, TagIcon } from './styles'

export default function TagList({ tags, activeTag, setTag }) {
  const [open, setOpen] = useState(false)
  return (
    <TagGrid open={open}>
      <h2>
        <TagsIcon size="1em" />
        &nbsp; Tags
        <Toggle open={open} onClick={() => setOpen(!open)} />
      </h2>
      {tags.map(({ node: { title, icon } }) => (
        <Tag
          open={open}
          key={title}
          active={activeTag === title}
          onClick={() => setTag(title)}
        >
          <TagIcon src={icon.file.url} alt={icon.title} />
          {title}
        </Tag>
      ))}
    </TagGrid>
  )
}
