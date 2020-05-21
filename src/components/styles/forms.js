import styled, { css } from 'styled-components'

const requiredCss = css`
  ::after {
    color: red;
    content: '*';
  }
`
const descriptionCss = css`
  font-size: 0.95em;
  color: ${p => p.theme.gray};
`
const errorCss = css`
  color: red;
  display: block;
  margin: 0.5em auto;
`

export const Text = styled.span.attrs(p => {
  if (!p.children && !p.html) console.error(`Text missing children and html`)
  if (p.html) return { dangerouslySetInnerHTML: { __html: p.html } }
})`
  ${p => p.required && requiredCss}
  ${p => p.description && descriptionCss}
  ${p => p.error && errorCss}
`

export const Input = styled.input`
  height: 2em;
  width: 20em;
  border-radius: 0.3em;
  border: 1px solid ${p => p.theme.lightGray};
  font-size: 1em;
`

export const Submit = styled.button.attrs({ type: `submit` })`
  display: block;
  font-size: 1.3em;
  margin: 2em auto;
  background: ${p => p.theme.green};
  color: white;
  border-radius: 0.4em;
  padding: 0.4em 0.6em;
  transition: 0.3s;
  border: none; /* for Safari */
  :hover {
    transform: scale(1.03);
    background: ${p => p.theme.darkGreen};
  }
`

export const ButtonGroup = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  overflow: hidden;
  width: max-content;
  border-radius: 0.5em;
  input[type='radio'] {
    display: none;
    :checked + span {
      background: ${p => p.theme.darkGreen};
      box-shadow: inset 0 0 0.3em ${p => p.theme.gray};
      transform: none;
    }
  }
  span {
    display: inline-block;
    font-size: 1.3em;
    border: none;
    outline: none;
    background: ${p => p.theme.blue};
    color: white;
    padding: 0.2em 0.6em;
    transition: 0.3s;
    :hover {
      background: ${p => p.theme.green};
    }
  }
`
