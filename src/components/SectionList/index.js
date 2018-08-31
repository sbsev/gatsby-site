import React from 'react'
import { Link } from 'gatsby'

import { Section, Container, SectionIcon } from './styles'

const SectionList = ({ sections }) => (
  <Container>
    {sections.edges.map(({ node: section }) => (
      <Section key={section.slug}>
        <Link to={`/wiki/` + section.slug}>
          <SectionIcon src={section.icon.file.url} alt={section.icon.title} />
          {section.title}
        </Link>
        {section.subsections && (
          <ol>
            {section.subsections.map(subsection => (
              <li key={subsection.slug}>
                <Link to={`/wiki/${section.slug}/${subsection.slug}`}>
                  {subsection.title}
                </Link>
              </li>
            ))}
          </ol>
        )}
      </Section>
    ))}
  </Container>
)

export default SectionList
