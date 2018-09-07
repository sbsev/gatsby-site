import React, { Component } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import Map from '../components/Map'
import PageBody from '../components/PageBody'
import PageMeta from '../components/PageMeta'

class ChaptersPage extends Component {
  initMap = () => {
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 51, lng: 10 },
      zoom: 6.2,
    })
  }

  getChapters = () => {
    const chapters = this.props.data.nav.data.nav
      .find(el => el.url === `/standorte`)
      .subNav.map(el => el.title)
    chapters.pop()
    this.chapters = chapters.map(el => el + `, Germany`)
  }

  addMarkers = () => {
    this.chapters.forEach(el => {
      this.geocoder.geocode({ address: el }, (res, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          new window.google.maps.Marker({
            map: this.map,
            position: res[0].geometry.location,
          })
        } else {
          console.warn(`Geocode unsuccessful for ${el}, status: ${status}`)
        }
      })
    })
  }

  componentDidMount() {
    this.geocoder = new window.google.maps.Geocoder()
    this.getChapters()
    this.initMap()
    this.addMarkers()
  }

  render() {
    const { data, location } = this.props
    const { page } = data
    const {
      title: { title },
      body,
    } = page

    const { excerpt, html } = body && body.data
    return (
      <Layout pageTitle={title} path={location.pathname} description={excerpt}>
        <PageTitle text={title} />
        <Map id="map" />
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
    nav: contentfulJson(title: { eq: "Nav" }) {
      data {
        nav {
          url
          title
          subNav {
            url
            title
          }
        }
      }
    }
  }
`
