import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import mediaQuery from 'utils/mediaQuery'

import MobileNav from './Mobile'
import DesktopNav from './Desktop'

export { navLinkStyle, NavLink } from './styles'

export default function Nav(props) {
  let { nav, chapters } = useStaticQuery(graphql`
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
  `)
  // clone nav and merge chapters
  // merging chapters without cloning: results in chapters compounding on every page navigation
  chapters = chapters.edges.map(({ node }) => ({
    title: node.title,
    url: `/` + node.slug,
  }))
  nav = JSON.parse(JSON.stringify(nav.data.nav))
  nav.find(el => el.url === `/standorte`).subNav.unshift(...chapters)
  if (typeof window !== `undefined`) {
    const query = window.matchMedia(mediaQuery.maxNetbookJs)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [mobile, setMobile] = useState(query.matches ? true : false)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const handleMatch = mq => setMobile(mq.matches ? true : false)
      query.addListener(handleMatch)
      return () => query.removeListener(handleMatch)
    })
    return mobile ? (
      <MobileNav {...props} nav={nav} />
    ) : (
      <DesktopNav {...props} nav={nav} />
    )
  } else return null
}
