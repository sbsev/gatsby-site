import React from 'react'
import { Link } from 'gatsby'

import {
  Container,
  Section,
  Subsection,
  SectionIcon,
  SubsectionIcon,
} from './styles'

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
              <Subsection key={subsection.slug}>
                <Link to={`/wiki/${section.slug}/${subsection.slug}`}>
                  <SubsectionIcon
                    src={subsection.icon.file.url}
                    alt={subsection.icon.title}
                  />
                  {subsection.title}
                </Link>
              </Subsection>
            ))}
          </ol>
        )}
      </Section>
    ))}
  </Container>
)

export default SectionList
