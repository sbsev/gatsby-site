import React from 'react'
import { graphql, Link } from 'gatsby'

import Global from 'components/Global'
import PageTitle from 'components/PageTitle'
import Map from 'components/Map'
import PageBody from 'components/PageBody'
import { Grid } from 'components/styles'

const addMarkers = chapters => map => {
  chapters.forEach(({ node }, index) => {
    const marker = new window.google.maps.Marker({
      map,
      position: node.coords,
      label: `${index + 1}`,
      title: node.title,
    })
    marker.addListener(`click`, () => {
      window.location.href = node.slug
    })
  })
}

const mapProps = chapters => ({
  options: {
    center: { lat: 51, lng: 10 },
    zoom:
      // Checking for window so as not to throw during server-side rendering.
      typeof window !== `undefined` &&
      5 + Math.min(window.innerWidth, window.innerHeight) / 1000,
  },
  onMount: addMarkers,
  onMountProps: chapters,
})

export default function ChaptersPage({ data, location }) {
  const { page, chapters } = data
  const { title, cover, caption, body, updatedAt } = page
  const { excerpt, html } = body.remark
  const mainChildren = (
    <>
      <Map {...mapProps(chapters.edges)} />
      <Grid gap="0 2em" as="ol" minWidth="8em">
        {chapters.edges.map(({ node }) => (
          <li key={node.slug}>
            <Link to={node.slug}>{node.title}</Link>
          </li>
        ))}
      </Grid>
    </>
  )
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle cover={cover} caption={caption}>
        <h1>{title}</h1>
      </PageTitle>
      <PageBody {...{ html, updatedAt, mainChildren }} />
    </Global>
  )
}

export const query = graphql`
  {
    page: contentfulPage(slug: { eq: "/standorte" }) {
      ...pageFields
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
