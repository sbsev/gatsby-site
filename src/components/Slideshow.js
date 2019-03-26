import React, { useEffect } from "react"
import { useTransition, animated } from "react-spring"

import { Img } from "./PageTitle/styles"

export default function Slideshow({ images, index, setIndex, ...rest }) {
  const { slideDuration = 6, transDuration = 1 } = rest
  const transitions = useTransition(images[index], img => img.title, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: transDuration * 1000 },
  })
  useEffect(
    () =>
      void setInterval(
        () => setIndex(state => (state + 1) % images.length),
        slideDuration * 1000
      ),
    []
  )
  return transitions.map(({ item, props, key }) => (
    <animated.div
      key={key}
      style={{
        ...props,
        willChange: `opacity`,
        zIndex: -1,
      }}
    >
      <Img fluid={item.fluid} />
    </animated.div>
  ))
}
