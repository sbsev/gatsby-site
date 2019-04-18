import React, { useEffect } from "react"
import { useTransition, useSpring, animated } from "react-spring"
import Img from "gatsby-image"

const KenBurns = ({ index, duration, children }) => {
  const props = useSpring({
    [index % 2 ? `from` : `to`]: {
      transform: `scale(1) translateX(0%)`,
    },
    [index % 2 ? `to` : `from`]: {
      transform: `scale(1.1) translateX(${!(index % 2) && `-`}3%)`,
    },
    config: { duration },
  })
  return (
    <animated.div
      style={{
        position: `absolute`,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        ...props,
      }}
    >
      {children}
    </animated.div>
  )
}

export default function Slideshow({ images, index, setIndex, ...rest }) {
  const { slideDuration = 6, transDuration = 1 } = rest
  const transitions = useTransition(images[index], img => img.title, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: transDuration * 1000 },
  })
  const inc = () => setIndex(++index % images.length)
  useEffect(() => void setInterval(inc, slideDuration * 1000), [])
  return transitions.map(({ item, props, key }) => (
    <animated.div
      key={key}
      style={{
        ...props,
        willChange: `opacity`,
        zIndex: -1,
      }}
    >
      <KenBurns index={index} duration={slideDuration * 1000}>
        <Img fluid={item.fluid} css="height: 100%;" />
      </KenBurns>
    </animated.div>
  ))
}
