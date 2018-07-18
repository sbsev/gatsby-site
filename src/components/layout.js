import React, { Fragment } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'

import Header from './Header'
import Footer from './Footer'
import theme from '../utils/theme'

injectGlobal`
  #___gatsby {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`

const Content = styled.main`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  margin: 2rem auto;
  padding: 1rem;
  flex: 1;
`

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