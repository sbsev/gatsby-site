import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../../components/Layout'
import PageTitle from '../../components/PageTitle'
import Map from '../../components/Map'
import PageBody from '../../components/PageBody'
import PageMeta from '../../components/PageMeta'

import { Chapters } from './styles'

class ChaptersPage extends Component {
  initMap = () => {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 51, lng: 10 },
      zoom: 6.2,
    })
  }

  addMarkers = () => {
    this.props.data.chapters.data.chapters.forEach(el => {
      this.geocoder.geocode(
        { address: el.title + `, Germany` },
        (res, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            new window.google.maps.Marker({
              map: this.map,
              position: res[0].geometry.location,
            })
          } else {
            console.warn(
              `Geocode unsuccessful for ${el.title}, status: ${status}`
            )
          }
        }
      )
    })
  }

  componentDidMount() {
    this.geocoder = new window.google.maps.Geocoder()
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
              <Link to={`standorte/` + chapter.url}>{chapter.title}</Link>
            </li>
          ))}
        </Chapters>
        {html && <PageBody dangerouslySetInnerHTML={{ __html: html }} />}
        <PageMeta {...page} />
      </Layout>
    )
  }
}

export default ChaptersPage

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
    chapters: contentfulJson(title: { eq: "Chapters" }) {
      data {
        chapters {
          url
          title
        }
      }
    }
  }
`
