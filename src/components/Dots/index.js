import React from 'react'
import PropTypes from 'prop-types'

import { DotsDiv, Dot } from './styles'

export default function Dots({ length, current, onClick, size = `0.8em` }) {
  return (
    <DotsDiv>
      {[...Array(length)].map((_, idx) => (
        <Dot
          key={idx}
          active={idx === current}
          onClick={() => onClick(idx)}
          size={size}
        />
      ))}
    </DotsDiv>
  )
}

Dots.propTypes = {
  length: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
}
