import React, { useState, useEffect } from 'react'
import Dots from '../Dots'
import { Slides, Slide } from './styles'

export default function Slideshow({ children, duration = 6 }) {
  const [current, setCurrent] = useState(0)
  const inc = () => setCurrent((current + 1) % children.length)
  useEffect(() => {
    const intervalId = setInterval(inc, duration * 1000)
    return () => clearInterval(intervalId)
  })
  return (
    <Slides>
      {children.map((child, index) => (
        <Slide active={index === current} key={index} duration={duration}>
          {child}
        </Slide>
      ))}
      <Dots {...{ current, length: children.length, onClick: setCurrent }} />
    </Slides>
  )
}
