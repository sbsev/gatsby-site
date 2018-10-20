import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  InstantSearch,
  Index,
  Hits,
  Stats,
  connectStateResults,
} from 'react-instantsearch-dom'
import { Algolia } from 'styled-icons/fa-brands/Algolia'

import { Root, SearchBox, HitsWrapper, Loupe, By } from './styles'
import PageHit from './PageHit'
import PostHit from './PostHit'

const events = ['mousedown', 'touchstart']

const Results = connectStateResults(
  ({ searchState: state, searchResults: results, children }) =>
    results && results.nbHits ? children : `Keine Ergebnisse für ${state.query}`
)

export default class Search extends Component {
  state = { query: ``, showHits: false }

  updateState = state => this.setState(state)

  enableHits = () => {
    this.setState({ showHits: true })
  }

  disableHits = () => {
    this.setState({ showHits: false })
  }

  handleClickOutside = event => {
    const node = ReactDOM.findDOMNode(this.node)
    if (node && !node.contains(event.target)) {
      this.setState({ showHits: false })
    }
  }

  componentDidMount() {
    events.forEach(event =>
      document.addEventListener(event, this.handleClickOutside)
    )
  }

  componentWillUnmount() {
    events.forEach(event =>
      document.removeEventListener(event, this.handleClickOutside)
    )
  }

  render() {
    return (
      <InstantSearch
        appId="T0ZLKGU1XK"
        apiKey="2bba2dc22c305d8a0472c4a76690093e"
        indexName="Pages"
        onSearchStateChange={this.updateState}
        root={{ Root }}
        ref={node => (this.node = node)}
      >
        <SearchBox onFocus={this.enableHits} />
        <Loupe />
        <HitsWrapper show={this.state.query.length > 0 && this.state.showHits}>
          <Stats
            translations={{
              stats: n => `${n} Ergebnis${n > 1 ? `se` : ``}`,
            }}
          />
          <Index indexName="Pages">
            <h2>Seiten</h2>
            <Results>
              <Hits hitComponent={PageHit(this.disableHits)} />
            </Results>
          </Index>
          <Index indexName="Posts">
            <h2>Blog</h2>
            <Results>
              <Hits hitComponent={PostHit(this.disableHits)} />
            </Results>
          </Index>
          <By>
            Powered by{' '}
            <a href="https://www.algolia.com">
              <Algolia size="1em" /> Algolia
            </a>
          </By>
        </HitsWrapper>
      </InstantSearch>
    )
  }
}
