import styled from 'styled-components'
import { Link } from 'gatsby'

export { UserEdit } from 'styled-icons/fa-solid/UserEdit'
export { Email } from 'styled-icons/material/Email'
export {
  ExternalLinkAlt as AuthorPage,
} from 'styled-icons/fa-solid/ExternalLinkAlt'
export { Calendar as Date } from 'styled-icons/octicons/Calendar'
export { Timer } from 'styled-icons/material/Timer'

export const Title = styled.h1`
  margin: 0.5em 0;
  font-size: 1.5em;
`

export const TitleLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.mainBlue};
`

export const Meta = styled.div`
  font-size: 0.9em;
  display: grid;
  grid: auto auto / max-content max-content;
  grid-gap: 0 1em;
  img {
    grid-row: 1 / -1;
    border-radius: 50%;
    height: 100%;
  }
  span {
    display: flex;
    align-items: center;
  }
  a {
    margin-left: 0.5em;
  }
`

export const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 0.8em;
`

export const Tag = styled.span`
  padding: 0 0.5em;
  border-radius: ${props => props.theme.smallBorderRadius};
  background: ${props => props.theme.lightGray};
  margin-left: 0.5em;
`

export const FeaturedImage = styled.img`
  width: 50%;
  transform: translate(50%);
  max-height: 20vmax;
  object-fit: cover;
`
