import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import Nav from './comp'

const query = graphql`
  {
    nav: contentfulJson(title: { eq: "Nav" }) {
      data {
        nav {
          url
          title
          subNav {
            url
            title
            span
          }
        }
      }
    }
    chapters: allContentfulChapter(
      filter: { active: { eq: true } }
      sort: { fields: title, order: ASC }
    ) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={query}
    render={({ nav, chapters }) => {
      // clone nav and merge chapters
      // merging chapters without cloning: results in chapters compounding on every page navigation
      nav = JSON.parse(JSON.stringify(nav.data.nav))
      chapters = chapters.edges.map(({ node }) => ({
        title: node.title,
        url: `/` + node.slug,
      }))
      nav.find(el => el.url === `/standorte`).subNav.unshift(...chapters)
      return <Nav nav={nav} {...props} />
    }}
  />
)

Nav.propTypes = {
  nav: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subNav: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          span: PropTypes.string,
        })
      ),
    })
  ).isRequired,
}
