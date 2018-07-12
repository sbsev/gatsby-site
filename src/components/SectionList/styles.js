import styled from 'styled-components'

import mediaQuery from '../../utils/mediaQuery'

export const ResponsiveList = styled.ol`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  justify-items: center;
  
  list-style: none;
  counter-reset: section;
  > li {
    position: relative;
    margin-top: 6rem;
    ${mediaQuery.phone} {
      margin-top: 3.75rem;
    }
  }
  > li:before {
    counter-increment: section;
    content: counter(section) ".";
    padding-right: 0.5rem;
  }
  li ol {
    list-style: none;
    counter-reset: inner;
  }
  ol li:before {
    counter-increment: inner;
    content: counter(section) "." counters(inner,'.');
    padding-right: 0.5rem;
  }
`

export const Section = styled.li`
  background: ${props => props.theme.veryLightGray};
  padding: 1rem 0.7rem;
  border-radius: ${props => props.theme.smallBorderRadius};
  width: 100%;
`

export const SectionIcon = styled.img`
  position: absolute;
  width: 5rem;
  top: -6rem;
  left: 0;
  right: 0;
  margin: auto;
  ${mediaQuery.phone} {
    width: 3rem;
    top: -3.75rem;
  }
`