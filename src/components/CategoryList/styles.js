import styled from 'styled-components'
import { Link } from 'gatsby'

import mediaQuery from '../../utils/mediaQuery'

export const Container = styled.div`
  ${mediaQuery.minTablet} {
    grid-column: 4 !important;
    grid-row: 2;
  }
  margin-bottom: 5vmin;
`

export const CategoryIcon = styled.img`
  height: 1.75em;
  width: 1.75em;
  min-width: 1.75em;
  margin-right: 0.7em;
  background: ${props => props.theme.lightGray};
  border-radius: ${props => props.theme.mediumBorderRadius};
  padding: 0.2em;
`

export const CategoryLink = styled(Link)`
  display: flex;
  align-items: center;
  &.${props => props.activeClassName} {
    color: ${props => props.theme.lightBlue};
  }
`

export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(10em, 1fr));
  grid-gap: 1em;
`
