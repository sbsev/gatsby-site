import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Container, Hero, Title, Button, Dots, Dot } from './styles'

export default class LandingTitle extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        node: PropTypes.shape({
          title: PropTypes.string.isRequired,
          fluid: PropTypes.object.isRequired,
        }),
      })
    ),
    speed: PropTypes.number.isRequired,
  }
  static defaultProps = {
    speed: 8000,
  }
  state = { hero: 0 }

  incrementHero = () => {
    this.setState({
      hero: (this.state.hero + 1) % this.props.images.length,
    })
  }

  setHero = index => {
    clearInterval(this.interval)
    this.interval = setInterval(() => this.incrementHero(), this.props.speed)
    this.setState({
      hero: index,
    })
  }

  componentDidMount() {
    this.interval = setInterval(() => this.incrementHero(), this.props.speed)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { hero } = this.state
    const { title, subtitle, images } = this.props
    return (
      <Container>
        {images.map(({ node }, index) => (
          <Hero key={index} active={index === hero} fluid={node.fluid} />
        ))}
        <Title>
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          <Button to="/standorte">Standorte</Button>
        </Title>
        <Dots>
          {Array.apply(null, { length: images.length }).map((el, ind) => (
            <Dot
              key={ind}
              active={hero === ind}
              onClick={() => this.setHero(ind)}
            />
          ))}
        </Dots>
      </Container>
    )
  }
}
