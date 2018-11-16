import React, { Component } from 'react'

import { Parent, Child } from './styles'

export default class Masonry extends Component {
  state = { spans: [], rowHeight: 35, ref: React.createRef() }

  componentDidMount() {
    const { rowHeight, ref } = this.state
    const spans = []
    Array.from(ref.current.children).forEach(child => {
      const span = Math.ceil(child.clientHeight / rowHeight)
      spans.push(span)
      child.style.height = span * rowHeight + `px`
    })
    this.setState({ spans })
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
