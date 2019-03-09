import React from "react"
import { graphql } from "gatsby"

import Global from "../components/Global"
import PageTitle from "../components/PageTitle"
import Scroll from "../components/Scroll"
import PageBody from "../components/PageBody"

import { Title, Subtitle } from "../components/styles/IndexPage"

const IndexPage = ({ data, location }) => {
  const { page, updatedAt } = data
  const { title, subtitle, cover, body } = page
  const { excerpt, html } = body && body.remark
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle
        images={cover && cover.map(({ title, img }) => ({ title, ...img }))}
        fillToBottom
        dots="top"
      >
        <Title>
          <h1>{title}</h1>
          <Subtitle
            dangerouslySetInnerHTML={{
              __html: subtitle && subtitle.remark.html,
            }}
          />
        </Title>
        <Scroll direction="down" to={1} />
      </PageTitle>
      <PageBody html={html} updated={updatedAt} />
    </Global>
  )
}

export default IndexPage

export const query = graphql`
  {
    page: contentfulPage(slug: { eq: "/" }) {
      ...pageFields
    }
  }
`
