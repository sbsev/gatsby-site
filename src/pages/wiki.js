import React from 'react'
import { graphql } from 'gatsby'

import Global from '../components/Global'
import PageTitle from '../components/PageTitle'
import SectionList from '../components/SectionList'
import Search from '../components/Search'

const WikiPage = ({ data, location }) => {
  const title = `Wiki`
  return (
    <Global pageTitle={title} path={location.pathname}>
      <PageTitle>
        <h1>{title}</h1>
      </PageTitle>
      <Search
        hitsAsGrid
        indices={[{ name: `Articles`, hitComp: `ArticleHit` }]}
      />
      <SectionList {...data} />
    </Global>
  )
}

export default WikiPage

export const query = graphql`
  {
    sections: allContentfulWikiSection(sort: { fields: [title], order: ASC }) {
      edges {
        node {
          title
          slug
          subsections: wiki_subsection {
            title
            slug
            icon {
              title
              file {
                url
              }
            }
          }
          icon {
            title
            file {
              url
            }
          }
        }
      }
    }
  }
`
