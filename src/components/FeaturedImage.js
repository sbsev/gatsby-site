import styled from 'styled-components'

const FeaturedImage = styled.img`
  width: ${props => props.small ? `25%` : `50%`};
  transform: translate(${props => props.small ? `150%` : `50%`});
  margin-bottom: ${props => props.smallMargin ? `0.5rem` : `2rem`};
`

export default FeaturedImage