import { animated } from "react-spring"
import styled, { css } from "styled-components"
import { Close } from "styled-icons/material/Close"
import { KeyboardArrowDown as More } from "styled-icons/material/KeyboardArrowDown"
import { KeyboardArrowRight as Arrow } from "styled-icons/material/KeyboardArrowRight"
import { KeyboardArrowUp as Less } from "styled-icons/material/KeyboardArrowUp"
import { ThMenu } from "styled-icons/typicons/ThMenu"
import mediaQuery from "../../../utils/mediaQuery"
import { NavLink } from "../styles"

export { NavLink }

const iconCss = css`
  width: 1em;
  margin-right: 0.2em;
  cursor: pointer;
  vertical-align: -0.15em;
`

export const Icons = {
  More: styled(More)`
    ${iconCss};
    color: ${props => props.theme.lightGreen};
  `,
  Less: styled(Less)`
    ${iconCss};
    color: ${props => props.theme.lightBlue};
  `,
  Arrow: styled(Arrow)`
    ${iconCss};
  `,
}

export const MobileNavDiv = styled.nav`
  position: fixed;
  z-index: 1; /* places nav on top of search and social icon in header */
  top: 0;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  height: 120vh;
  background: rgba(0, 0, 0, 0.85);
  padding: 8vmin 8vmin 8vmin 6vmin;
  box-sizing: border-box;
  font-size: 1.6em;
  color: white;
  right: 100%;
  display: grid;
  grid-gap: 1em;
  min-width: 20vw;
  grid-auto-columns: max-content;
  grid-auto-rows: max-content;
  transform: translate(${props => (props.open ? `100%` : `0`)});
  transition: ${props => props.theme.shortTrans};
  ${mediaQuery.maxNetbook} {
    max-width: 13em;
  }
  ${mediaQuery.maxPhone} {
    justify-content: center;
    text-align: center;
    width: 100%;
    max-width: initial;
  }
`

export const Children = styled(animated.div)`
  will-change: transform, opacity, height;
  margin-left: 0.5em;
  padding-left: 0.5em;
  border-left: thin dashed white;
  overflow: hidden;
  padding-bottom: ${props => props.open && `0.6em`};
  > div {
    margin-top: 0.6em;
    display: grid;
    grid-gap: 0.6em;
  }
`

export const Menu = styled(NavLink).attrs({
  size: `1em`,
  as: ThMenu,
})`
  cursor: pointer;
  transform: scale(1.7, 1.3);
  margin: 0 0.3em;
`

export const Closer = styled(Close)`
  position: absolute;
  top: 0.8em;
  right: 1em;
  width: 1.5em;
  ${mediaQuery.minPhone} {
    display: none;
  }
`
