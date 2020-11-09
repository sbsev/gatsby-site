import React from 'react'
import { PageComponents, Providers } from 'components/Global'

export const wrapRootElement = ({ element }) => {
  return <Providers>{element}</Providers>
}

export const wrapPageElement = ({ element, props }) => {
  return <PageComponents {...props}>{element}</PageComponents>
}

// For tracking user movements across the site. The SignupPage submits
// window.locations to Airtable for analysis.
export const onRouteUpdate = () => {
  if (!window.locations) window.locations = [document.referrer]
  window.locations.push(location.pathname + location.search)
}
