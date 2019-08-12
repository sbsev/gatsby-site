import React, { useEffect, useRef } from 'react'
import { Img, PageTitleContainer, Title } from './styles'

export default function PageTitle({ children, cover, ...rest }) {
  const { fillToBottom, height, className, background } = rest
  const ref = useRef()
  useEffect(() => {
    if (fillToBottom || height === -1) {
      const fillAvailHeight = () =>
        (ref.current.style.minHeight =
          window.innerHeight - ref.current.offsetTop + `px`)
      fillAvailHeight()
      window.addEventListener(`resize`, fillAvailHeight)
      return () => window.removeEventListener(`resize`, fillAvailHeight)
    }
  }, [fillToBottom, height])
  const containerProps = { ref, className, minHeight: height > 0 && height }
  if (cover && cover.fluid && !cover.fluid.src) {
    cover.src = cover.file.url
    delete cover.fluid
  }
  return (
    <PageTitleContainer {...containerProps}>
      <Title>{children}</Title>
      <Img {...cover}>{background}</Img>
    </PageTitleContainer>
  )
}
