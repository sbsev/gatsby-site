import React, { useState, useEffect } from "react"

import Dots from "../Dots"
import { Slides, Slide } from "./styles"

export default function Slideshow({ children, ...rest }) {
  const { duration = 5, showDots = true, content } = rest
  const [current, setCurrent] = useState(0)
  const inc = () => setCurrent((current + 1) % children.length)
  useEffect(() => {
    const intervalId = setInterval(inc, duration * 1000)
    return () => clearInterval(intervalId)
  })
  const dotProps = {
    current,
    length: children.length,
    onClick: setCurrent,
  }
  return (
    <Slides>
      {children.map((child, index) => (
        <Slide active={index === current} key={index} duration={duration}>
          {child}
        </Slide>
      ))}
      {content[current]}
      {showDots && <Dots {...dotProps} css="z-index: 100;" />}
    </Slides>
  )
}
