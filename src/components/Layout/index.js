import React, { Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

import Helmet from '../Helmet'
import Header from '../Header'
import Footer from '../Footer'
import theme from '../../utils/theme'
import { Content } from './styles'

const Layout = ({ children, site, ...rest }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Helmet site={site.meta} {...rest} />
      <Header site={site.meta} />
      <Content>{children}</Content>
      <Footer />
    </Fragment>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default props => (
  <StaticQuery
    query={graphql`
      {
        site {
          meta: siteMetadata {
            title
            url: siteUrl
            description
          }
        }
      }
    `}
    render={data => <Layout {...data} {...props} />}
  />
)
