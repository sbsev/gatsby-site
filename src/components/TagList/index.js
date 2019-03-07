import React, { useState } from "react"

import { TagGrid, Toggle, Tag, TagsIcon, TagIcon } from "./styles"

const TagList = ({ tags, activeTag, setTag }) => {
  const [open, setOpen] = useState(false)
  return (
    <TagGrid open={open}>
      <h2>
        <TagsIcon size="1em" />
        &nbsp; Tags
        <Toggle open={open} onClick={() => setOpen(!open)} />
      </h2>
      {tags.map(({ node: { title, slug, icon } }) => (
        <Tag
          open={open}
          key={title}
          active={activeTag === slug}
          onClick={() => setTag(slug)}
        >
          <TagIcon src={icon.file.url} alt={icon.title} />
          {title}
        </Tag>
      ))}
    </TagGrid>
  )
}

export default TagList
