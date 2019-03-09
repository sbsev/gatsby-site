import React from "react"
import { graphql } from "gatsby"

import Global from "../components/Global"
import PageTitle from "../components/PageTitle"
import Scroll from "../components/Scroll"
import PageBody from "../components/PageBody"
import RichBody from "../components/RichBody"

import { Title, Subtitle } from "../components/styles/IndexPage"

const PageTemplate = ({ data, location }) => {
  const { page, updatedAt } = data
  const { title, subtitle, cover, coverProps, body, richBody } = page
  const { excerpt, html } = body && body.remark
  return (
    <Global pageTitle={title} path={location.pathname} description={excerpt}>
      <PageTitle
        images={cover && cover.map(({ title, img }) => ({ title, ...img }))}
        fillToBottom={coverProps && coverProps.fillToBottom}
      >
        <Title>
          <h1>{title}</h1>
          <Subtitle
            dangerouslySetInnerHTML={{
              __html: subtitle && subtitle.remark.html,
            }}
          />
        </Title>
        {coverProps && coverProps.showDownArrow && (
          <Scroll direction="down" to={1} />
        )}
      </PageTitle>
      <PageBody html={html} updated={updatedAt} />
      {richBody && <RichBody doc={JSON.parse(richBody.richBody)} />}
    </Global>
  )
}

export default PageTemplate

export const query = graphql`
  query($slug: String!) {
    page: contentfulPage(slug: { eq: $slug }) {
      ...pageFields
    }
  }
`
