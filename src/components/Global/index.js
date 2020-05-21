import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { colors } from 'utils/theme'
import BrowserCheck from '../BrowserCheck'
import Footer from '../Footer'
import Header from '../Header'
import Scroll from '../Scroll'
import Seo from '../Seo'
import { GlobalStyle } from './styles'

export const Providers = ({ children }) => (
  <ThemeProvider theme={colors}>{children}</ThemeProvider>
)

export function PageComponents({ children, ...rest }) {
  const { site } = useStaticQuery(graphql`
    {
      site {
        site: siteMetadata {
          title
          url
          description
        }
      }
    }
  `)
  return (
    <>
      <GlobalStyle />
      <BrowserCheck />
      <Seo {...site} {...rest} />
      <Header {...site} />
      {children}
      <Footer />
      <Scroll showBelow={1500} css="position: fixed; right: 1em;" />
    </>
  )
}
