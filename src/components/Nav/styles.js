import styled, { css } from "styled-components"
import { Link } from "gatsby"

export const navLinkStyle = css`
  color: white;
  transition: ${props => props.theme.shortTrans};
  &.active {
    color: ${props => props.theme.orange};
  }
  :hover {
    color: ${props => props.theme.lightBlue};
  }
`

const span = css`
  grid-column: 1/-1;
  border-top: 1px solid white;
  padding-top: 0.2em;
`

export const NavLink = styled(Link).attrs({
  activeClassName: `active`,
  partiallyActive: true,
})`
  ${navLinkStyle};
  ${props => props.span && span};
`
