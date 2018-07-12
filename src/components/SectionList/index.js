import React, { Fragment } from 'react'
import Link from 'gatsby-link'

import { Section, ResponsiveList, SectionIcon } from './styles'

const SectionList = ({ sections }) => (
  <ResponsiveList>
    {sections.edges.map(({ node: section }) =>
      <Section key={section.slug}>
        <Link to={`/wiki/` + section.slug}>
          <SectionIcon
            src={section.icon.file.url}
            alt={section.icon.title}
          />
          {section.title}
        </Link>
        {section.subsections && <ol>
          {section.subsections.map(subsection =>
            <li key={subsection.slug}>
              <Link to={`/wiki/${section.slug}/${subsection.slug}`}>
                {subsection.title}
              </Link>
            </li>
          )}
        </ol>}
      </Section>
    )}
  </ResponsiveList>
)

export default SectionList