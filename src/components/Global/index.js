import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { ThemeProvider } from "styled-components"
import PropTypes from "prop-types"

import Helmet from "../Helmet"
import Header from "../Header"
import Footer from "../Footer"
import theme from "../../utils/theme"
import Scroll from "../Scroll"
import CookieConsent from "../CookieConsent"
import { GlobalStyle } from "./styles"

const Global = ({ children, site, ...rest }) => (
  <ThemeProvider theme={theme}>
    <>
      <Helmet site={site.meta} {...rest} />
      <GlobalStyle />
      <Header site={site.meta} />
      {children}
      <Footer />
      <Scroll to="top" position="fixed" align="right" showBelow={2000} />
      <CookieConsent />
    </>
  </ThemeProvider>
)

Global.propTypes = {
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
  <StaticQuery query={query} render={data => <Global {...data} {...props} />} />
)
