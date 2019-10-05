import React, { useEffect, useRef } from 'react'
import { PageTitleDiv, Title, Img } from './styles'
import { Caption } from '../styles'

export default function PageTitle({ children, cover, caption, ...rest }) {
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
  if (cover && (!cover.fluid || (cover.fluid && !cover.fluid.src))) {
    cover.src = cover.file.url
    delete cover.fluid
  }
  return (
    <PageTitleDiv {...containerProps}>
      <Title>{children}</Title>
      <Img {...cover}>{background}</Img>
      {caption && (
        <Caption
          showOnHoverParent={PageTitleDiv}
          dangerouslySetInnerHTML={{ __html: caption.remark.html }}
        />
      )}
    </PageTitleDiv>
  )
}
