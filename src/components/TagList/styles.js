import styled from 'styled-components'
export { Tags as TagsIcon } from 'styled-icons/fa-solid/Tags'
import { ToggleOff } from 'styled-icons/fa-solid/ToggleOff'
import { ToggleOn } from 'styled-icons/fa-solid/ToggleOn'

import mediaQuery from 'utils/mediaQuery'

export const TagGrid = styled.div`
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
  color: ${props => props.theme.darkGray};
  border-radius: ${props => props.theme.smallBorderRadius};
  background: ${({ active, theme }) => active && theme.orange};
  box-shadow: 0 0 0.5em ${props => props.theme.lighterGray};
  border: 1px solid ${props => props.theme.lightGray};
  ${mediaQuery.maxPhablet} {
    padding: 0.1em 0.5em 0.2em;
    margin: 0 1em 1em 0;
    transition: ${props => props.theme.mediumTrans};
    visibility: ${props => (props.open ? `visible` : `hidden`)};
    margin-bottom: ${props => (props.open ? `1em` : `-2em`)};
    opacity: ${props => (props.open ? 1 : 0)};
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
