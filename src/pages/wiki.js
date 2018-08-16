import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle' 
import SectionList from '../components/SectionList'

const WikiIndex = ({ data }) => (
  <Layout>
    <Helmet title={data.site.meta.title} />
    <PageTitle text="Wiki" />
    <SectionList {...data} />
  </Layout>
)

export default WikiIndex

// postFields defined in src/templates/post.js
export const wikiIndexQuery = graphql`
  {
    ...siteMetaQuery
    sections: allContentfulWikiSection(
      sort: {fields: [title], order: DESC}
    ) {
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
