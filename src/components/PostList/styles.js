import styled from "styled-components"

import mediaQuery from "../../utils/mediaQuery"

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(17em, 1fr));
  grid-gap: 1em;
  font-size: 0.8em;
  line-height: 1.4em;
  grid-column: 2/4;
  ${mediaQuery.maxPhone} {
    grid-column: 3;
  }
`
