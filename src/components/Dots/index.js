import React from 'react'
import PropTypes from 'prop-types'

import { DotsContainer, Dot } from './styles'

const Dots = ({ length, current, onClick, size = `0.8em`, dots }) => (
  <DotsContainer dots={dots}>
    {Array.apply(null, { length }).map((dot, index) => (
      <Dot
        key={index}
        active={index === current}
        onClick={() => onClick(index)}
        size={size}
      />
    ))}
  </DotsContainer>
)

export default Dots

Dots.propTypes = {
  length: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
}
