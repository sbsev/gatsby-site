import React, { memo, useRef, useState, useEffect } from 'react'
import { animated, useSpring } from 'react-spring'
import { useOnClickOutside, useSize } from 'hooks'
import {
  Children,
  ArrowUp,
  ArrowDown,
  Item,
  MobileNavDiv,
  NavToggle,
} from './styles'
import { NavLink } from '../styles'
import { globalHistory } from '@reach/router'

const Tree = memo(({ text, url, children }) => {
  const ref = useRef()
  const [open, setOpen] = useState(false)
  const treeHeight = useSize(ref, `height`)
  const { height, opacity, transform } = useSpring({
    from: { height: 0, opacity: 0, transform: `translateX(1em)` },
    to: {
      height: open ? treeHeight : 0,
      opacity: open ? 1 : 0,
      transform: `translateX(${open ? 0 : 1}em)`,
    },
  })
  const Icon = open ? ArrowUp : ArrowDown
  return (
    <Item>
      {children && <Icon onClick={() => setOpen(!open)} />}
      <NavLink to={url}>{text}</NavLink>
      {children && (
        <Children style={{ opacity, height }} open={open}>
          <animated.div style={{ transform }} ref={ref}>
            {children}
          </animated.div>
        </Children>
      )}
    </Item>
  )
})

export default function MobileNav({ nav }) {
  const ref = useRef()
  const [open, setOpen] = useState(false)
  useOnClickOutside(ref, () => open && setOpen(false))
  // Manually close MobileNav on route changes. This doesn't happen automatically
  // because the component is included in wrapPageElement which is never unmounted.
  // globalHistory.listen returns an unsubscribe function
  useEffect(() => globalHistory.listen(() => setOpen(false)), [])
  return (
    <>
      <NavToggle open={open} onClick={() => setOpen(true)} />
      <MobileNavDiv ref={ref} open={open} onScroll={e => e.preventDefault()}>
        <NavToggle closer open={open} onClick={() => setOpen(false)} />
        {nav.map(({ title, url, subNav }) => (
          <Tree key={url} url={url || subNav[0].url} text={title}>
            {subNav &&
              subNav.map(item => (
                <Tree key={item.url} url={item.url} text={item.title} />
              ))}
          </Tree>
        ))}
      </MobileNavDiv>
    </>
  )
}
