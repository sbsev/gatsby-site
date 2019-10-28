import { graphql, useStaticQuery } from 'gatsby'
import React, { useMemo } from 'react'
import { BrowserWarning } from './styles'

const query = graphql`
  {
    json: contentfulJson(title: { eq: "Browser Check" }) {
      md {
        remark: childMarkdownRemark {
          html
        }
      }
    }
  }
`

function getBrowser() {
  // Adapted from https://stackoverflow.com/a/53149880.
  if (typeof window === `undefined`) return {}
  const ua = navigator.userAgent
  const nameRegex = /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
  let matches = ua.match(nameRegex) || []
  let tem
  if (/trident/i.test(matches[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return { name: `IE`, version: tem[1] || `` }
  }
  if (matches[1] === `Chrome`) {
    tem = ua.match(/\bOPR\/(\d+)/)
    if (tem != null) {
      return { name: `Opera`, version: tem[1] }
    }
  }
  if (ua.indexOf(`Edge`) > -1) {
    tem = ua.match(/Edge\/(\d+)/)
    if (tem != null) {
      return { name: `Edge`, version: tem[1] }
    }
  }
  matches = matches[2]
    ? [matches[1], matches[2]]
    : [navigator.appName, navigator.appVersion, `-?`]
  if ((tem = ua.match(/version\/(\d+)/i)) != null) {
    matches.splice(1, 1, tem[1])
  }
  return {
    name: matches[0],
    version: parseInt(matches[1]),
  }
}

export default function BrowserCheck() {
  const data = useStaticQuery(query)
  const { name } = useMemo(() => getBrowser(), [])
  return (
    [`IE`, `Edge`].includes(name) && (
      <BrowserWarning
        dangerouslySetInnerHTML={{ __html: data.json.md.remark.html }}
      />
    )
  )
}
