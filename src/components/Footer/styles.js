import styled, { css } from 'styled-components'
import Link from 'gatsby-link'
import mediaQuery from '../../utils/mediaQuery'

const footerLinkStyle = css`
  color: inherit;
  &:hover {
    color: ${props => props.theme.mainGreen};
    text-decoration: none;
  }
`

export const Background = styled.footer`
  background-color: ${props => props.theme.darkGray};
`

export const Content = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0.75rem;
  color: ${props => props.theme.lightText};
`

export const FooterLink = styled(Link)`
  ${footerLinkStyle};
  float: right;
  & + & {
    margin-right: 1rem;
  }
`