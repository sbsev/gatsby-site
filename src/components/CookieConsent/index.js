import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"

import { CookieConsentContainer } from "./styles"

const CookieConsent = ({ text, timeout = 5, userConsented = false }) => {
  const { message, button } = text
  if (
    typeof document !== `undefined` &&
    document.cookie.includes(`cookieConsent=true`)
  )
    userConsented = true
  const [visible, setVisible] = useState(userConsented ? false : true)
  const handleConsent = () => {
    setVisible(false)
    document.cookie = `cookieConsent=true`
  }
  setTimeout(handleConsent, timeout * 1000)
  return (
    <CookieConsentContainer visible={visible}>
      <span dangerouslySetInnerHTML={{ __html: message }} />
      <button onClick={handleConsent}>{button}</button>
    </CookieConsentContainer>
  )
}

const query = graphql`
  {
    text: contentfulJson(title: { eq: "Cookie Consent" }) {
      text: data {
        message
        button
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={query}
    render={data => <CookieConsent {...data.text} {...props} />}
  />
)
