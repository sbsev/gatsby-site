import React, { Fragment } from 'react'
import Link from 'gatsby-link'

import { List, Subsection } from './styles'

const SubsectionList = ({ sectionSlug, subsections }) => (
  <Fragment>
    <h2>Unterpunkte</h2>
    <List>
      {subsections.map(subsection =>
        <Subsection key={subsection.slug}>
          <Link to={`/wiki/${sectionSlug}/${subsection.slug}`}>
            {subsection.title}
          </Link>
        </Subsection>
      )}
    </List>
  </Fragment>
)

export default SubsectionList