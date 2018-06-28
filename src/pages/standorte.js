import React, { Fragment } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const ChapterList = styled.ol`
  display: grid;
  grid-gap: 0 2rem;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
`

const ChapterIndex = props => {
  const { nav } = props.data.header.data
  const [ chapters ] = nav.filter(navItem =>
    navItem.url === `/standorte`
  )

  return (
    <Fragment>
      <h1>Standorte</h1>
      <ChapterList>
        {chapters.subNav.map(chapter =>
          <li key={chapter.url}>
            <Link to={chapter.url}>
              {chapter.title}
            </Link>
          </li>
        )}
      </ChapterList>
    </Fragment>
  )
}

export default ChapterIndex

export const query = graphql`
  query ChaptersQuery {
    header: contentfulJson(title: {eq: "Header"}) {
      data {
        nav {
          url
          subNav {
            url
            title
          }
        }
      }
    }
  }
`
