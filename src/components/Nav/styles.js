import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

const span = css`
  grid-column: 1/-1;
  border-top: 1px solid white;
  padding-top: 0.5em;
`

export const NavLink = styled(Link).attrs({
  activeClassName: `active`,
  partiallyActive: true,
})`
  ${props => props.span && span};
`
