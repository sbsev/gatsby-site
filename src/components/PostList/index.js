import React, { Component } from 'react'

import { Posts, Post } from './styles'
import PostExcerpt from '../PostExcerpt'

export default class PostList extends Component {
  state = { spans: [], rowHeight: 50 }

  componentDidMount() {
    const posts = document.getElementById('posts')
    const spans = []
    Array.from(posts.children).forEach(child => {
      spans.push(
        Math.ceil(child.children[0].clientHeight / this.state.rowHeight) + 1
      )
    })
    this.setState({ spans })
  }

  render() {
    const { rowHeight, spans } = this.state
    return (
      <Posts id="posts" rowHeight={rowHeight}>
        {this.props.posts.map(({ node }, i) => (
          <Post key={node.slug} span={spans[i]}>
            <PostExcerpt post={node} />
          </Post>
        ))}
      </Posts>
    )
  }
}
