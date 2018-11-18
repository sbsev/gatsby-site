import React, { Component } from 'react'

import { Parent, Child } from './styles'

export default class Masonry extends Component {
  state = { spans: [], rowHeight: 40, ref: React.createRef() }

  computeSpans() {
    const { rowHeight, ref } = this.state
    const spans = []
    Array.from(ref.current.children).forEach(child => {
      const span = Math.ceil(child.clientHeight / rowHeight)
      spans.push(span + 1)
      child.style.height = span * rowHeight + `px`
    })
    this.setState({ spans })
  }

  componentDidMount() {
    this.computeSpans()
    window.addEventListener('resize', this.computeSpans)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.computeSpans)
  }

  render() {
    const { rowHeight, spans } = this.state
    return (
      <Parent ref={this.state.ref} rowHeight={rowHeight}>
        {this.props.children.map((child, i) => (
          <Child key={i} span={spans[i]}>
            {child}
          </Child>
        ))}
      </Parent>
    )
  }
}
