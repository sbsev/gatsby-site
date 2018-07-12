import React, { Fragment } from 'react'
import Helmet from 'react-helmet'

import PageTitle from '../components/PageTitle' 
import SectionList from '../components/SectionList'

const WikiIndex = ({ data }) => (
  <Fragment>
    <Helmet title={data.site.meta.title} />
    <PageTitle text="Wiki" />
    <SectionList {...data} />
  </Fragment>
)

export default WikiIndex

// postFields defined in src/templates/post.js
export const wikiIndexQuery = graphql`
  query WikiIndex {
    site {
      meta: siteMetadata {
        title
      }
    }
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
