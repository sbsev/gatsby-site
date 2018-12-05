import React, { Component } from 'react'

import { Parent, Child } from './styles'

export default class Masonry extends Component {
  static defaultProps = {
    rowHeight: 40, // in pixels
    colWidth: `17em`,
  }

  state = { spans: [], ref: React.createRef() }

  computeSpans = () => {
    const { rowHeight } = this.props
    const spans = []
    Array.from(this.state.ref.current.children).forEach(child => {
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
    return (
      <Parent ref={this.state.ref} {...this.props}>
        {this.props.children.map((child, i) => (
          <Child key={i} span={this.state.spans[i]}>
            {child}
          </Child>
        ))}
      </Parent>
    )
  }
}
