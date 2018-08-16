import React, { Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'

import Header from '../Header'
import Footer from '../Footer'
import theme from '../../utils/theme'
import { Content } from './styles'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      fragment siteMetaQuery on RootQueryType {
        site {
          meta: siteMetadata {
            title
            url: siteUrl
          }
        }
      }
      query LayoutQuery {
        ...siteMetaQuery
        header: contentfulJson(title: {eq: "Header"}) {
          data {
            social {
              email
              facebook
              github
              linkedin
            }
            nav {
              url
              title
              subNav {
                url
                title
              }
            }
          }
        }
        footer: contentfulJson(title: {eq: "Footer"}) {
          data {
            copyright
            links {
              url
              title
            }
          }
        }
      }
    `}
    render={({ header, footer, site }) => (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Header meta={site.meta} header={header.data} />
          <Content>{children}</Content>
          <Footer footer={footer.data} />
        </Fragment>
      </ThemeProvider>
    )}
  />
)

export default Layout