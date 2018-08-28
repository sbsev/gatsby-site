import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import SectionList from '../components/SectionList'

const WikiIndex = ({ data, location }) => {
  const title = `Wiki`
  return (
    <Layout pageTitle={title} path={location.pathname}>
      <PageTitle text={title} />
      <SectionList {...data} />
    </Layout>
  )
}

export default WikiIndex

// postFields defined in src/templates/post.js
export const wikiIndexQuery = graphql`
  {
    sections: allContentfulWikiSection(sort: { fields: [title], order: DESC }) {
      edges {
        node {
          title
          slug
          subsections {
            title
            slug
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
