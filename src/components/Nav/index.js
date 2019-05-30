import React, { useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"

import mediaQuery from "../../utils/mediaQuery"

import MobileNav from "./Mobile"
import DesktopNav from "./Desktop"

export { navLinkStyle, NavLink } from "./styles"

const Nav = props => {
  if (typeof window !== `undefined`) {
    const query = window.matchMedia(mediaQuery.maxNetbookJs)
    const [mobile, setMobile] = useState(query.matches ? true : false)
    useEffect(() => {
      const handleMatch = mq => setMobile(mq.matches ? true : false)
      query.addListener(handleMatch)
      return () => query.removeListener(handleMatch)
    })
    return mobile ? <MobileNav {...props} /> : <DesktopNav {...props} />
  } else return null
}

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
      chapters = chapters.edges.map(({ node }) => ({
        title: node.title,
        url: `/` + node.slug,
      }))
      nav = JSON.parse(JSON.stringify(nav.data.nav))
      nav.find(el => el.url === `/standorte`).subNav.unshift(...chapters)
      return <Nav nav={nav} {...props} role="navigation" />
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
