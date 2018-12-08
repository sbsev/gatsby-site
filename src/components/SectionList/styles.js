import styled from 'styled-components'

import mediaQuery from '../../utils/mediaQuery'

export const Container = styled.ol`
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fit, minmax(10em, 1fr));
  padding: 0;

  list-style: none;
  counter-reset: section;
  > li {
    position: relative;
    margin-top: 6em;
    ${mediaQuery.maxPhone} {
      margin-top: 3.75em;
    }
  }
  > li:before {
    counter-increment: section;
    content: counter(section) '.';
    padding-right: 0.5em;
  }
  li ol {
    list-style: none;
    counter-reset: inner;
  }
  ol li:before {
    counter-increment: inner;
    content: counter(section) '.' counters(inner, '.');
    padding-right: 0.5em;
  }
`

export const Section = styled.li`
  background: ${props => props.theme.veryLightGray};
  padding: 0.5em;
  border-radius: ${props => props.theme.smallBorderRadius};
`

export const Subsection = styled.li`
  position: relative;
`

export const SectionIcon = styled.img`
  position: absolute;
  width: 5em;
  top: -6em;
  left: 0;
  right: 0;
  margin: auto;
  ${mediaQuery.maxPhone} {
    width: 3em;
    top: -3.75em;
  }
`

export const SubsectionIcon = styled.img`
  position: absolute;
  width: 1em;
  left: -1.6em;
  top: 0.4em;
`
