import React from 'react'
import { graphql, Link } from 'gatsby'

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
  options: { center: { lat: 51.5, lng: 10 }, zoom: 5.6 },
  onMount: addMarkers,
  onMountProps: chapters,
})

export default function ChaptersPage({ data }) {
  const { page, chapters } = data
  const { title, cover, caption, body, updatedAt } = page
  const { html } = body.remark
  return (
    <>
      <PageTitle cover={cover} caption={caption}>
        <h1>{title}</h1>
      </PageTitle>
      <PageBody {...{ html, updatedAt }}>
        <Map {...mapProps(chapters.edges)} />
        <Grid gap="0 2em" as="ol" minWidth="8em">
          {chapters.edges.map(({ node }) => (
            <li key={node.slug}>
              <Link to={node.slug}>{node.title}</Link>
            </li>
          ))}
        </Grid>
      </PageBody>
    </>
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
