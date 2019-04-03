import React, { useRef, useState, useEffect } from 'react'

import Slideshow from '../Slideshow'
import { PageTitleContainer, Title, Img } from './styles'

const PageTitle = ({ children, images, className, ...rest }) => {
  const { fillToBottom, textBg, durations, height } = rest
  const ref = useRef()
  if (fillToBottom || height === -1) {
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
  const containerProps = { ref, className, minHeight: height > 0 && height }
  return (
    <PageTitleContainer {...containerProps}>
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
        <Slideshow {...{ images, index, setIndex, durations }} />
      ) : (
        <Img fluid={images && images[0].fluid} />
      )}
    </PageTitleContainer>
  )
}

export default PageTitle
