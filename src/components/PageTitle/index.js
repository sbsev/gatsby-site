import React, { useEffect, useRef } from 'react'
import { PageTitleDiv, Title } from './styles'
import ImageCopyright from '../ImageCopyright'

export default function PageTitle({
  children,
  cover,
  coverCopyright,
  ...rest
}) {
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
  if (cover && !cover.fluid) cover.src = cover.file.url
  return (
    <PageTitleDiv {...containerProps}>
      <Title>{children}</Title>
      <ImageCopyright
        cover={cover}
        background={background}
        copyright={coverCopyright}
      />
    </PageTitleDiv>
  )
}
