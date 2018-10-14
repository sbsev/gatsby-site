import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  SearchBox,
  Index,
  Hits,
  connectStateResults,
} from 'react-instantsearch-dom'
import { Algolia } from 'styled-icons/fa-brands/Algolia'

import { Root, HitsWrapper, Input, Loupe, By } from './styles'
import PageHit from './PageHit'
import PostHit from './PostHit'

const searchClient = algoliasearch(
  'T0ZLKGU1XK',
  '2bba2dc22c305d8a0472c4a76690093e'
)

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
        indexName="Pages"
        searchClient={searchClient}
        onSearchStateChange={this.updateState}
        root={{ Root }}
        ref={node => (this.node = node)}
      >
        <Input>
          <SearchBox
            translations={{ placeholder: `Suche` }}
            onFocus={this.enableHits}
          />
          <Loupe />
        </Input>
        <HitsWrapper show={this.state.query.length > 0 && this.state.showHits}>
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
