import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import styled from "styled-components"
import Global from "../components/Global"
import PageBody from "../components/PageBody"
import PageTitle from "../components/PageTitle"
import Scroll from "../components/Scroll"
import Slideshow from "../components/Slideshow"

const Content = styled.div`
  text-align: center;
  font-size: calc(1em + 0.5vw);
  margin: 1em;
  max-width: 30em;
  justify-self: center;
  align-self: center;
  padding: 0.1em 0.4em;
  z-index: 20;
  > * {
    background: rgba(0, 0, 0, 0.7);
    border-radius: ${props => props.theme.smallBorderRadius};
    justify-self: center;
    padding: 0.1em 0.4em;
  }
  a {
    color: ${props => props.theme.orange};
    :hover {
      color: ${props => props.theme.lightGreen};
    }
    /* button styles */
    em strong {
      font-style: normal;
      background: ${props => props.theme.orange};
      color: white !important;
      border-radius: ${props => props.theme.smallBorderRadius};
      padding: 0.3em 0.6em;
      transition: ${props => props.theme.shortTrans};
      display: inline-block;
      :hover {
        background: ${props => props.theme.lightGreen};
      }
    }
  }
`

const slideContent = (slides, subtitle) =>
  slides.map(slide => (
    <Content key={slide.title}>
      <p
        dangerouslySetInnerHTML={{
          __html: subtitle.remark.html,
        }}
      />
      <p
        dangerouslySetInnerHTML={{
          __html: slide.subtitle.remark.html,
        }}
      />
    </Content>
  ))

const bg = (slides, subtitle) => (
  <Slideshow content={slideContent(slides, subtitle)}>
    {slides.map(({ title, img }) => (
      <Img key={title} fluid={img.fluid} css="height: fill-available;" />
    ))}
  </Slideshow>
)

export default function IndexPage({ data, location }) {
  const { page, slideshow, updatedAt } = data
  const { title, subtitle, body } = page
  const { excerpt, html } = body && body.remark
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle fillToBottom background={bg(slideshow.slides, subtitle)}>
        <Scroll direction="down" to={1} css="bottom: 2em;" />
      </PageTitle>
      <PageBody html={html} updated={updatedAt} />
    </Global>
  )
}

export const query = graphql`
  {
    page: contentfulPage(slug: { eq: "/" }) {
      ...pageFields
    }
    slideshow: contentfulSlideshow(title: { eq: "Landing Page" }) {
      slides {
        ...slideFields
      }
    }
  }
`
