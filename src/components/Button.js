import styled from 'styled-components'
import PropTypes from 'prop-types'

import Link from './Link'

const Button = styled(Link)`
  background: ${props => props.theme.darkBlue};
  color: ${props => props.theme.mainWhite};
  border-radius: ${props => props.theme.smallBorderRadius};
  padding: 0.4em 0.6em;
  font-size: ${props => props.size};
  transition: ${props => props.theme.shortTrans};
  :hover {
    background: ${props => props.theme.lightBlue};
  }
`

export default Button

Button.propTypes = {
  size: PropTypes.string.isRequired,
}

Button.defaultProps = {
  size: `1.2em`,
}
