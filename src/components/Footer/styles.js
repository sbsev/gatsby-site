import styled from 'styled-components'
import Link from 'gatsby-link'
import mediaQuery from '../../utils/mediaQuery'

export const Background = styled.footer`
  background-color: ${props => props.theme.darkGray};
`

export const Content = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 0.75rem;
  color: ${props => props.theme.mainWhite};
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mediaQuery.phone} {
    flex-direction: column;
  }
`

export const FooterLinks = styled.div`
  background: ${props => props.theme.mainGray};
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.largeBorderRadius};
`

export const FooterLink = styled(Link)`
  color: inherit;
  &:hover {
    color: ${props => props.theme.mainGreen};
    text-decoration: none;
  }
  & + & {
    margin-left: 1rem;
  }
`