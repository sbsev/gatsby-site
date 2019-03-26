import React from "react"
import { graphql, Link } from "gatsby"

import Global from "../components/Global"
import PageTitle from "../components/PageTitle"
import Map from "../components/Map"
import PageBody from "../components/PageBody"
import Grid from "../components/styles/Grid"

const addMarkers = chapters => map => {
  chapters.forEach(({ node }, index) => {
    const marker = new window.google.maps.Marker({
      map,
      position: node.coords,
      label: `${index + 1}`,
      title: node.title,
    })
    marker.addListener(`click`, () => {
      window.location.href = `/standorte/` + node.slug
    })
  })
}

const mapProps = chapters => ({
  options: {
    center: { lat: 51, lng: 10 },
    zoom:
      // checking for window so as not to throw during server-side rendering
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
        <Map {...mapProps(chapters.edges)} />
        <Grid gap="0 2em" as="ol" minWidth="10em">
          {chapters.edges.map(({ node }) => (
            <li key={node.slug}>
              <Link to={`/standorte/` + node.slug}>{node.title}</Link>
            </li>
          ))}
        </Grid>
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
