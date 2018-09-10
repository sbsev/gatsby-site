import React, { Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import PropTypes from 'prop-types'

import Helmet from '../Helmet'
import Header from '../Header'
import Footer from '../Footer'
import theme from '../../utils/theme'
import { Content, GlobalStyle } from './styles'
import Scrollup from '../Scrollup'

const Layout = ({ children, site, ...rest }) => (
  <ThemeProvider theme={theme}>
    <Fragment>
      <Helmet site={site.meta} {...rest} />
      <GlobalStyle />
      <Header site={site.meta} />
      <Content>{children}</Content>
      <Footer />
      <Scrollup />
    </Fragment>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

const query = graphql`
  {
    site {
      meta: siteMetadata {
        title
        url: siteUrl
        description
      }
    }
  }
`

export default props => (
  <StaticQuery query={query} render={data => <Layout {...data} {...props} />} />
)
