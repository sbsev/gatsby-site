import React, { Fragment } from 'react'

import { Grid, ImageContainer, Description } from './styles'

const ImageGrid = ({images: { imageList, captions, description }}) => (
  <Fragment>
    <Description dangerouslySetInnerHTML={{__html: description.data.html}} />
    <Grid>
      {imageList.map((image, index) =>
        <ImageContainer>
          <img src={image.file.url} alt={captions[index].main} />
          <figcaption>
            {captions[index].main && <p>{captions[index].main}</p>}
            {captions[index].sub && <p>{captions[index].sub}</p>}
            {captions[index].link &&
              <a href={captions[index].link.url}>
                {captions[index].link.text}
              </a>
            }
          </figcaption>
        </ImageContainer>
      )}
    </Grid>
  </Fragment>
)

export default ImageGrid