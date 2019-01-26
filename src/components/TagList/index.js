import React from "react"

import { Container, List, TagIcon, Tag } from "./styles"

const TagList = ({ tags, activeTag, setTag }) => (
  <Container>
    <h2>Tags</h2>
    <List>
      {tags.map(({ node: { title, icon } }) => (
        <Tag
          key={title}
          active={activeTag === title}
          onClick={() => setTag(title)}
        >
          <TagIcon src={icon.file.url} alt={icon.title} />
          {title}
        </Tag>
      ))}
    </List>
  </Container>
)

export default TagList
