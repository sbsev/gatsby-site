import React from 'react'

import { Img, Container, Middle, Text } from './styles'

export default function ImageCopyright(props) {
  const { copyright, cover, background } = props
  return (
    <Container>
      <Img {...cover}>{background}</Img>
      {copyright && (
        <Middle>
          <Text>{copyright}</Text>
        </Middle>
      )}
    </Container>
  )
}
