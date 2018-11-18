import styled from 'styled-components'
import mediaQuery from '../../utils/mediaQuery'

export const Container = styled.div`
  font-size: 0.8em;
  line-height: 1.4em;
  grid-column: 2/4;
  ${mediaQuery.phone} {
    grid-column: 3;
  }
`
