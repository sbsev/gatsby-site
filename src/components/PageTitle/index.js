import React from 'react'
import { PageTitleDiv, Title, Img } from './styles'
import { Caption } from '../styles'
import Slideshow from '../Slideshow'

export default function PageTitle({ children, cover, caption, slideshow, ...rest }) {
  if (cover && !cover.fluid) cover.src = cover.file.url
  return (
    <PageTitleDiv {...rest}>
      {slideshow ? (
        <Slideshow>
          {slideshow.slides.map(({ title, fluid }) => (
            <Img key={title} fluid={fluid} alt={title} style={{ height: `100%` }} />
          ))}
        </Slideshow>
      ) : (
        <Img {...cover} alt={cover.title} />
      )}
      <Title>{children}</Title>
      {caption && (
        <Caption
          showOnHoverParent={PageTitleDiv}
          dangerouslySetInnerHTML={{ __html: caption.remark.html }}
        />
      )}
    </PageTitleDiv>
  )
}
