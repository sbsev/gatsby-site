import styled from 'styled-components'
import { ToggleOff, ToggleOn } from 'styled-icons/fa-solid'
import mediaQuery from 'utils/mediaQuery'
export { Tags as TagsIcon } from 'styled-icons/fa-solid'

export const TagGrid = styled.aside`
  display: grid;
  grid-gap: 0.8em;
  grid-column: 4;
  height: max-content;
  h2 {
    margin: 0;
  }
  ${mediaQuery.maxPhablet} {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 0 2em;
    grid-column: 2/-2;
    h2 {
      width: 100%;
      margin-bottom: 1em;
      text-align: center;
    }
  }
`

export const Tag = styled.button`
  font-size: 1em;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: max-content;
  white-space: nowrap;
  color: ${p => p.theme.darkGray};
  border-radius: 0.2em;
  background: ${({ active, theme }) => active && theme.orange};
  box-shadow: 0 0 0.5em ${p => p.theme.lighterGray};
  border: 1px solid ${p => p.theme.lightGray};
  ${mediaQuery.maxPhablet} {
    padding: 0.1em 0.5em 0.2em;
    margin: 0 1em 1em 0;
    transition: 0.6s;
    visibility: ${p => (p.open ? `visible` : `hidden`)};
    margin-bottom: ${p => (p.open ? `1em` : `-2em`)};
    opacity: ${p => (p.open ? 1 : 0)};
  }
`

export const TagIcon = styled.img`
  width: 1.5em;
  margin-right: 0.4em;
`

export const Toggle = styled(ToggleOff).attrs(props => ({
  as: props.open && ToggleOn,
  size: `1em`,
}))`
  margin-left: 0.5em;
  cursor: pointer;
  ${mediaQuery.minPhablet} {
    display: none;
  }
`
