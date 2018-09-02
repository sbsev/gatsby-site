import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Grid, Hero, Img, Scroll, Title, Button } from './styles'

class ImageGrid extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          title: PropTypes.string.isRequired,
          fluid: PropTypes.shape({
            src: PropTypes.string.isRequired,
          }),
        }),
      })
    ),
  }
  state = { hero: 0 }

  incrementHero = () => {
    this.setState({
      hero: (this.state.hero + 1) % this.props.images.length,
    })
  }

  setHero = index => {
    this.setState({
      hero: index,
    })
  }

  scroll = () => {
    window.scroll({
      top: 1300,
      behavior: 'smooth',
    })
  }

  componentDidMount() {
    this.interval = setInterval(() => this.incrementHero(), 8000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { hero } = this.state
    const { title, subtitle, images } = this.props
    return (
      <Grid>
        {images.map(({ node }, index) => (
          <Img
            key={node.title}
            src={node.fluid.src}
            alt={node.title}
            onClick={() => this.setHero(index)}
          />
        ))}
        <Hero src={images[hero].node.fluid.src} />
        <Title>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <Button to="/standorte">Standorte</Button>
        </Title>
        <Scroll onClick={this.scroll} size="1em" />
      </Grid>
    )
  }
}

export default ImageGrid
