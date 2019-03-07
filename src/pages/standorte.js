import React from "react"
import { graphql, Link } from "gatsby"

import Global from "../components/Global"
import PageTitle from "../components/PageTitle"
import Map from "../components/Map"
import PageBody from "../components/PageBody"
import Chapters from "../components/styles/Chapters"

const addMarkers = chapters => map => {
  let chapterCount = 1
  chapters.forEach(({ node }) => {
    const marker = new window.google.maps.Marker({
      map,
      position: node.coords,
      label: `${chapterCount}`,
      title: node.title,
    })
    marker.addListener(`click`, () => {
      window.location.href = `/standorte/` + node.slug
    })
    ++chapterCount
  })
}

const mapProps = chapters => ({
  options: {
    center: { lat: 51, lng: 10 },
    zoom:
      // checking that window is defined necessary for compiling on server
      typeof window !== `undefined` &&
      5 + Math.min(window.innerWidth, window.innerHeight) / 1000,
  },
  onMount: addMarkers(chapters),
})

const ChaptersPage = ({ data, location }) => {
  const { page, chapters } = data
  const { title, body, updatedAt } = page
  const { excerpt, html } = body.remark
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle>
        <h1>{title}</h1>
      </PageTitle>
      <PageBody html={html} updated={updatedAt}>
        <Map id="chapterMap" {...mapProps(chapters.edges)} />
        <Chapters>
          {chapters.edges.map(({ node }) => (
            <li key={node.slug}>
              <Link to={`/standorte/` + node.slug}>{node.title}</Link>
            </li>
          ))}
        </Chapters>
      </PageBody>
    </Global>
  )
}

export default ChaptersPage

export const query = graphql`
  {
    page: contentfulPage(slug: { eq: "standorte" }) {
      title
      body {
        remark: childMarkdownRemark {
          excerpt
          html
        }
      }
      updatedAt(formatString: "D. MMM YYYY", locale: "de")
    }
    chapters: allContentfulChapter(
      filter: { active: { eq: true } }
      sort: { fields: title, order: ASC }
    ) {
      edges {
        node {
          title
          slug
          coords {
            lat
            lng: lon
          }
        }
      }
    }
  }
`
