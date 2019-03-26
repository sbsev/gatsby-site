import React, { useRef, useState, useEffect } from "react"

import Slideshow from "../Slideshow"
import { PageTitleContainer, Title, Img } from "./styles"

const PageTitle = ({ children, images, className, ...rest }) => {
  const { fillToBottom, textBg, slideDuration, transDuration } = rest
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
  const [index, setIndex] = useState(0)
  const current = images && images[index]
  return (
    <PageTitleContainer ref={ref} className={className}>
      <Title textBg={textBg || (current && current.textBg)}>
        {children}
        {current && current.subtitle && (
          <div
            dangerouslySetInnerHTML={{
              __html: current.subtitle.remark.html,
            }}
          />
        )}
      </Title>
      {images && images.length > 1 ? (
        <Slideshow
          {...{ images, index, setIndex, slideDuration, transDuration }}
        />
      ) : (
        <Img fluid={images && images[0].fluid} />
      )}
    </PageTitleContainer>
  )
}

export default PageTitle
