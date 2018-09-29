import React, { Component } from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import PageTitle from '../components/PageTitle'
import Map from '../components/Map'
import PageBody from '../components/styles/PageBody'
import PageMeta from '../components/PageMeta'
import Chapters from '../components/styles/Chapters'

export default class ChaptersPage extends Component {
  addMarkers = map => {
    this.props.data.chapters.data.chapters.forEach((chapter, index) => {
      const marker = new window.google.maps.Marker({
        map,
        position: chapter.coords,
        label: `${index + 1}`,
        title: chapter.title,
      })
      marker.addListener('click', () => {
        window.location.href = `/standorte` + chapter.url
      })
    })
  }

  mapProps = {
    options: {
      center: { lat: 51, lng: 10 },
      zoom:
        // checking that window is defined necessary for compiling on server
        typeof window !== 'undefined' &&
        5 + Math.min(window.innerWidth, window.innerHeight) / 1000,
    },
    onMount: this.addMarkers,
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
        <PageTitle>
          <h1>{title}</h1>
        </PageTitle>
        <Map id="chapterMap" {...this.mapProps} />
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
