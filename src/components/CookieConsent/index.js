import React, { useState } from "react"
import { StaticQuery, graphql } from "gatsby"

import { CookieConsentContainer } from "./styles"

const CookieConsent = ({ timeout = 5, cookieConsent }) => {
  const { message, button } = cookieConsent.data
  const userConsentedPreviously = document.cookie.includes(`cookieConsent=true`)
  const [visible, setVisible] = useState(userConsentedPreviously ? false : true)
  const handleConsent = () => {
    setVisible(false)
    if (document) document.cookie = `cookieConsent=true`
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
    cookieConsent: contentfulJson(title: { eq: "Cookie Consent" }) {
      data {
        message
        button
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={query}
    render={data => <CookieConsent {...data} {...props} />}
  />
)
