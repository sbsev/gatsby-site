import Img from 'gatsby-image'
import styled from 'styled-components'

export const Post = styled.article`
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 1em ${props => props.theme.lightGray};
  border-radius: ${props => props.theme.mediumBorderRadius};
  border: 1px solid ${props => props.theme.lightGray};
  overflow: hidden;
  > main {
    padding: 1em;
    display: grid;
  }
  h2 {
    margin-top: 0;
  }
`

export const Cover = styled(Img).attrs(
  ({ fluid, src }) => !fluid && src && { as: `img` }
)`
  height: 15em;
`

export const Tag = styled.button`
  color: white;
  background: ${({ active, theme }) => (active ? theme.blue : theme.lightBlue)};
  font-size: 0.9em;
  margin-bottom: 0.2em;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: ${props => props.theme.smallBorderRadius};
`
