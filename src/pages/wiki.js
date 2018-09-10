import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import SectionList from '../components/SectionList'

const Wiki = ({ data, location }) => {
  const title = `Wiki`
  return (
    <Layout pageTitle={title} path={location.pathname}>
      <PageTitle text={title} />
      <SectionList {...data} />
    </Layout>
  )
}

export default Wiki

export const query = graphql`
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
