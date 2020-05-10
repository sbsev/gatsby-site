import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

const span = css`
  grid-column: 1/-1;
  border-top: 1px solid white;
  padding-top: 0.5em;
`

export const NavLink = styled(Link).attrs({
  activeClassName: `active`,
  partiallyActive: true,
})`
  ${p => p.span && span};
`
