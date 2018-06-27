import React from 'react'

import { Grid, ImageContainer } from './styles'

const ImageGrid = ({ images }) => (
  <Grid>
    {images.map(image =>
      <ImageContainer>
        <img src={image.file.url} alt={image.title} />
        <figcaption>
          <p>{image.title}</p>
          <p>{image.description}</p>
        </figcaption>
      </ImageContainer>
    )}
  </Grid>
)

export default ImageGrid