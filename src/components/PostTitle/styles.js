import styled from 'styled-components'
import Img from 'gatsby-image'

export { UserEdit } from 'styled-icons/fa-solid/UserEdit'
export { Email } from 'styled-icons/material/Email'
export {
  ExternalLinkAlt as AuthorPage,
} from 'styled-icons/fa-solid/ExternalLinkAlt'
export { Calendar as Date } from 'styled-icons/octicons/Calendar'
export { Timer } from 'styled-icons/material/Timer'

export const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.h1`
  color: ${props => props.theme.mainBlue};
`

export const Author = styled.div`
  color: ${props => props.theme.lightBlue};
  text-align: center;
`

export const AuthorPhoto = styled(Img)`
  border-radius: 50%;
`

export const Meta = styled.div`
  font-size: 0.9em;
  margin: 2em 0;
  padding: 0 1em;
  color: ${props => props.theme.lightBlue};
  border: ${({ theme }) => theme.mediumBorder + ' solid ' + theme.darkBlue};
  border-radius: ${props => props.theme.largeBorderRadius};
  display: flex;
  align-items: center;
`

export const FeaturedImage = styled(Img)`
  width: 100%;
  max-height: 30vmax;
  object-fit: cover;
  margin: 3vmin 0;
  border-radius: ${props => props.theme.mediumBorderRadius};
`
