import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useScreenQuery } from 'hooks'
import MobileNav from './Mobile'
import DesktopNav from './Desktop'

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
  chapters = chapters.edges.map(({ node }) => ({
    title: node.title,
    url: node.slug,
  }))
  // Clone nav and insert chapters.
  // Merging chapters without cloning results in chapters compounding on every link click.
  nav = JSON.parse(JSON.stringify(nav.data.nav))
  nav.find(el => el.url === `/standorte`).subNav.unshift(...chapters)
  const mobile = useScreenQuery(`maxNetbook`)
  if (mobile) return <MobileNav nav={nav} {...props} />
  // Only render DesktopNav if screen query is false.
  if (mobile === false) return <DesktopNav nav={nav} {...props} />
  // Render nothing in SSR to avoid showing DesktopNav on mobile
  // on initial page load from cleared cache.
  return null
}
