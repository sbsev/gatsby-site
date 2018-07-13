import styled from 'styled-components'

import mediaQuery from '../../utils/mediaQuery'

export const BlogIndexLayout = styled.div`
  ${mediaQuery.minPhone} {
    display: grid;
    grid-template-columns: 1fr min-content;
    grid-gap: 1rem;
    ${mediaQuery.minTablet} {
      grid-gap: 3rem;
    }
  }
`