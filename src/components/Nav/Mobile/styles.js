import { animated } from 'react-spring'
import styled, { css } from 'styled-components'
import { Close as Cross } from 'styled-icons/material'
import { ThMenu } from 'styled-icons/typicons'
import { mediaQueries } from 'utils/mediaQueries'

export {
  KeyboardArrowDown as ArrowDown,
  KeyboardArrowUp as ArrowUp,
} from 'styled-icons/material'

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
  color: white;
  right: 100%;
  display: grid;
  grid-gap: 1em;
  grid-auto-rows: max-content;
  transform: translate(${p => (p.open ? `99%` : `0`)});
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
  padding-bottom: ${p => p.open && `0.6em`};
  > div {
    margin-top: 0.6em;
    display: grid;
    grid-gap: 0.6em;
  }
`

const closerCss = css`
  position: absolute;
  top: 1em;
  right: 1.3em;
`

export const NavToggle = styled(ThMenu).attrs(props => ({
  as: props.closer && Cross,
  size: `1.4em`,
}))`
  color: white;
  transition: 0.3s;
  cursor: pointer;
  :hover {
    transform: scale(1.1);
  }
  ${mediaQueries.minLaptop} {
    display: none;
  }
  ${p => p.closer && closerCss};
`
