import React from 'react'
import { Link } from 'gatsby'

import { List, Subsection, SubsectionIcon } from './styles'

const SubsectionList = ({ sectionSlug, subsections, path = `` }) => {
  const subsectionSlug = path.split(`/`).pop()
  return (
    <>
      <h2>Unterpunkte</h2>
      <List>
        {subsections.map(subsection => (
          <Subsection
            key={subsection.slug}
            active={subsection.slug === subsectionSlug}
          >
            <Link to={`/wiki/${sectionSlug}/${subsection.slug}`}>
              <SubsectionIcon
                src={subsection.icon.file.url}
                alt={subsection.icon.title}
              />
              {subsection.title}
            </Link>
          </Subsection>
        ))}
      </List>
    </>
  )
}

export default SubsectionList
