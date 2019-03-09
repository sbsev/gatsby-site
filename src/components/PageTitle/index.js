import React, { useRef, useEffect } from "react"

import Slideshow from "../Slideshow"
import { PageTitleContainer, Title, Img } from "./styles"

const PageTitle = ({ children, images, backdrop, className, fillToBottom }) => {
  const ref = useRef()
  if (fillToBottom) {
    const fillAvailHeight = () =>
      (ref.current.style.height =
        window.innerHeight - ref.current.offsetTop + `px`)
    useEffect(() => {
      fillAvailHeight()
      window.addEventListener(`resize`, fillAvailHeight)
      return () => window.removeEventListener(`resize`, fillAvailHeight)
    })
  }
  return (
    <PageTitleContainer ref={ref} className={className}>
      {images && images.length > 1 ? (
        <Slideshow topDots>
          {images.map(({ title, fluid }) => (
            <Img key={title} fluid={fluid} />
          ))}
        </Slideshow>
      ) : (
        <Img fluid={images && images[0].fluid} />
      )}
      <Title backdrop={backdrop}>{children}</Title>
    </PageTitleContainer>
  )
}

export default PageTitle
