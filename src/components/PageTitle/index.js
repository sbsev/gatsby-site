import React, { useRef, useEffect } from "react"

import { PageTitleContainer, Title, Img } from "./styles"

export default function PageTitle({ children, cover, ...rest }) {
  const { fillToBottom, height, className, background } = rest
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
  const containerProps = { ref, className, minHeight: height > 0 && height }
  return (
    <PageTitleContainer {...containerProps}>
      <Title>{children}</Title>
      <Img {...cover}>{background}</Img>
    </PageTitleContainer>
  )
}
