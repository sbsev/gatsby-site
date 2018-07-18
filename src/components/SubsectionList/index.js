import React, { Fragment } from 'react'
import { Link } from 'gatsby'

import { List, Subsection } from './styles'

const SubsectionList = ({ sectionSlug, subsections, path = `` }) => {
  const subsectionSlug = path.split(`/`).pop()
  return <Fragment>
    <h2>Unterpunkte</h2>
    <List>
      {subsections.map(subsection =>
        <Subsection
          key={subsection.slug}
          active={subsection.slug === subsectionSlug}
        >
          <Link to={`/wiki/${sectionSlug}/${subsection.slug}`}>
            {subsection.title}
          </Link>
        </Subsection>
      )}
    </List>
  </Fragment>
}

export default SubsectionList