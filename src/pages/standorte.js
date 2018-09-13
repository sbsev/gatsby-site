import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import Map from '../components/styles/Map'
import PageBody from '../components/styles/PageBody'
import PageMeta from '../components/PageMeta'
import Chapters from '../components/styles/Chapters'

export default class ChaptersPage extends Component {
  initMap = () => {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 51, lng: 10 },
      zoom: 6.2,
    })
  }

  addMarkers = () => {
    this.props.data.chapters.data.chapters.forEach(chapter => {
      const marker = new window.google.maps.Marker({
        map: this.map,
        position: chapter.coords,
        label: chapter.title[0],
        title: chapter.title,
      })
      marker.addListener('click', () => {
        window.location.href = `/standorte` + chapter.url
      })
    })
  }

  componentDidMount() {
    this.initMap()
    this.addMarkers()
  }

  render() {
    const { data, location } = this.props
    const { page, chapters } = data
    const {
      title: { title },
      body,
    } = page

    const { excerpt, html } = body && body.data
    return (
      <Layout pageTitle={title} path={location.pathname} description={excerpt}>
        <PageTitle text={title} />
        <Map id="map" />
        <Chapters>
          {chapters.data.chapters.map(chapter => (
            <li key={chapter.url}>
              <Link to={`/standorte` + chapter.url}>{chapter.title}</Link>
            </li>
          ))}
        </Chapters>
        {html && <PageBody dangerouslySetInnerHTML={{ __html: html }} />}
        <PageMeta {...page} />
      </Layout>
    )
  }
}

export const query = graphql`
  {
    page: contentfulPage(slug: { eq: "standorte" }) {
      title {
        title
      }
      body {
        data: childMarkdownRemark {
          excerpt
          html
        }
      }
      updated: updatedAt(formatString: "D. MMMM YYYY", locale: "de")
    }
    chapters: contentfulJson(title: { eq: "Standorte" }) {
      data {
        chapters {
          url
          title
          coords {
            lat
            lng
          }
        }
      }
    }
  }
`
