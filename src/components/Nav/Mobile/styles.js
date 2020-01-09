import { animated } from 'react-spring'
import styled, { css } from 'styled-components'
import { ThMenu } from 'styled-icons/typicons/ThMenu'
import { Close as Cross } from 'styled-icons/material/Close'
import mediaQuery from 'utils/mediaQuery'

export { KeyboardArrowDown as ArrowDown } from 'styled-icons/material/KeyboardArrowDown'
export { KeyboardArrowUp as ArrowUp } from 'styled-icons/material/KeyboardArrowUp'

export const MobileNavDiv = styled.nav`
  z-index: 1;
  overscroll-behavior: none;
  box-sizing: border-box;
  width: 15em;
  max-width: 80vw;
  position: fixed;
  top: 0;
  overflow: scroll;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  padding: 2em;
  font-size: 1.4em;
  color: white;
  right: 100%;
  display: grid;
  grid-gap: 1em;
  grid-auto-rows: max-content;
  transform: translate(${props => (props.open ? `99%` : `0`)});
  transition: 0.3s;
  line-height: 1.4em;
  /* Needed to scroll past last element in case of overflow. */
  :after {
    content: '';
    height: 0.5em;
  }
`

export const Item = styled.div`
  /* Target arrow icons prefixing nav links with children. */
  svg:first-child {
    width: 1em;
    margin-right: 0.3em;
    cursor: pointer;
    vertical-align: -0.1em;
  }
`

export const Children = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 0.5em;
  padding-left: 0.8em;
  border-left: thin dashed white;
  overflow: hidden;
  padding-bottom: ${props => props.open && `0.6em`};
  > div {
    margin-top: 0.6em;
    display: grid;
    grid-gap: 0.6em;
  }
`

const openerCss = css`
  position: fixed;
  bottom: 2vh;
  left: 0;
  padding: 0.5em 0.6em 0.5em 0.3em;
  background: white;
  border-radius: 0 50% 50% 0;
  transform: translate(${props => (props.open ? `-100%` : 0)});
  border: 1px solid;
  border-left: none;
`

const closerCss = css`
  color: white;
  position: absolute;
  top: 1em;
  right: 1.3em;
`

export const NavToggle = styled(Cross).attrs(props => ({
  as: props.opener && ThMenu,
  size: props.opener ? `1.3em` : `1.5em`,
}))`
  transition: 0.3s;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
  ${mediaQuery.minLaptop} {
    display: none;
  }
  ${props => (props.opener ? openerCss : closerCss)};
`
