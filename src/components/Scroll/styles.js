import styled from 'styled-components'
import { ArrowDownCircle as Down, ArrowUpCircle as Up } from 'styled-icons/feather'

export const Arrow = styled(Down).attrs(props => ({
  as: props.direction === `up` && Up,
}))`
  position: absolute;
  bottom: 1em;
  right: calc(50vw - ${p => p.size} / 2);
  background: ${p => p.theme.lighterGreen};
  color: white;
  border-radius: 50%;
  transition: 0.3s;
  opacity: ${p => (p.show ? 1 : 0)};
  visibility: ${p => (p.show ? `visible` : `hidden`)};
  :hover {
    transform: scale(1.15);
    background: ${p => p.theme.orange};
  }
`
