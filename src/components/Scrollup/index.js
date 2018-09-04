import React from 'react'
import PropTypes from 'prop-types'
import ScrollToTop from 'react-scroll-up'

import { UpArrow } from './styles'

const Scrollup = ({ size, ...rest }) => (
  <ScrollToTop {...rest}>
    <UpArrow size={size} />
  </ScrollToTop>
)

export default Scrollup

Scrollup.propTypes = {
  showUnder: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
  rest: PropTypes.object,
}

Scrollup.defaultProps = {
  showUnder: 2000,
  size: `2em`,
  style: {
    right: 50,
  },
}
