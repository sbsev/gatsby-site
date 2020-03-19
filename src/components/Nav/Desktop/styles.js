import styled from 'styled-components'
import { fadeInOnHoverParent } from '../../styles'

export { DownArrow } from 'styled-icons/boxicons-solid'

// Unfortunately can't accomodate expanding search box via overflow-x: scroll;
// because of https://stackoverflow.com/a/6433475 as it will
// include SubNavs in vertical scrolling, effectively hiding them.
export const DesktopNavDiv = styled.nav`
  display: grid;
  grid-gap: calc(1em + 1vw);
  transition: 0.3s;
  grid-auto-flow: column;
  justify-self: start;
`

export const NavEntry = styled.div`
  position: relative;
`

export const SubNav = styled.div`
  display: grid;
  width: max-content;
  border-radius: 0.2em;
  grid-gap: 0.5em 1em;
  position: absolute;
  transition: 0.3s;
  padding: 0.7em 1em;
  grid-template-columns: ${props =>
    props.children.length >= 10 ? `1fr 1fr` : `1fr`};
  background: rgba(0, 0, 0, 0.9);
  ${fadeInOnHoverParent(NavEntry)}
`
