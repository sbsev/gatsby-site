import { startCase } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { Helmet } from 'react-helmet'
import favicon from 'assets/favicon.svg'

export default function Seo({ site, uri = ``, data, children }) {
  const pageTitle = `${data?.page?.title || startCase(uri)} | ${site.title}`
  const pageUrl = site.url + uri
  const description = data?.page?.excerpt || site.description
  return (
    <Helmet title={pageTitle}>
      <meta property="og:type" content="website" />
      <html lang="de" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />
      <link rel="icon" href={favicon} type="image/svg+xml" sizes="any" />
      {children}
    </Helmet>
  )
}

Seo.propTypes = {
  site: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
  uri: PropTypes.string.isRequired,
}
