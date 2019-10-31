import styled from 'styled-components'

import mediaQuery from '../../utils/mediaQuery'

export const PostListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17em, 1fr));
  grid-gap: 2em 1.5em;
  font-size: 0.8em;
  line-height: 1.4em;
  height: max-content;
  grid-column: 2/4;
  grid-row: 1;
  ${mediaQuery.maxPhablet} {
    grid-row: 2;
  }
`
