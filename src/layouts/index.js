import React, { Component, Fragment } from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'

import Header from '../components/Header'
import Footer from '../components/Footer'
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

class Template extends Component {
  render() {
    const { header, footer, site } = this.props.data
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <Header meta={site.meta} header={header.data} />
          <Content>{this.props.children()}</Content>
          <Footer footer={footer.data} />
        </Fragment>
      </ThemeProvider>
    )
  }
}

export default Template

export const query = graphql`
  query TemplateQuery {
    site {
      meta: siteMetadata {
        title
      }
    }
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
`
