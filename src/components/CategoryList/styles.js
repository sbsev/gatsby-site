import styled from 'styled-components'
import Link from 'gatsby-link'

import mediaQuery from '../../utils/mediaQuery'

export const CategoryLink = styled(Link)`
  white-space: nowrap;
  color: ${props => props.active ? props.theme.mainGreen : ''}
`

export const List = styled.ul`
  ${mediaQuery.phone} {
    columns: 2;
  }
`

export const ListTitle = styled.h1`
  ${mediaQuery.minPhone} {
    margin-top: 0;
  }
`