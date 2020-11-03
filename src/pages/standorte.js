import React from 'react'
import { graphql, Link } from 'gatsby'

import PageTitle from 'components/PageTitle'
import Map from 'components/Map'
import PageBody from 'components/PageBody'
import { Grid } from 'components/styles'

const addMarkers = chapters => map => {
  chapters.forEach(({ title, slug, coords }, index) => {
    const marker = new window.google.maps.Marker({
      map,
      position: coords,
      label: `${index + 1}`,
      title,
    })
    marker.addListener(`click`, () => {
      window.location.href = slug
    })
  })
  map.fitBounds({ south: 49, west: 8, north: 54, east: 12 })
}

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
        <Grid gap="0 2em" as="ol" minWidth="8em">
          {chapters.nodes.map(({ slug, title }) => (
            <li key={slug}>
              <Link to={slug}>{title}</Link>
            </li>
          ))}
        </Grid>
        <Map
          {...{
            onMount: addMarkers,
            onMountProps: chapters.nodes,
            options: { disableDefaultUI: true },
          }}
          css="margin: 2em calc(50% - 50vw);"
        />
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
      filter: { active: { eq: true }, node_locale: { eq: "de" } }
      sort: { fields: title, order: ASC }
    ) {
      nodes {
        title
        slug
        coords {
          lat
          lng: lon
        }
      }
    }
  }
`
