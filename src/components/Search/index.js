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

import { Root, SearchBox, HitsWrapper, By } from './styles'
import * as hitComps from './hits'

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
    const { query, showHits } = this.state
    const { indices, collapse, hitsAsGrid } = this.props
    return (
      <InstantSearch
        appId="T0ZLKGU1XK"
        apiKey="2bba2dc22c305d8a0472c4a76690093e"
        indexName="Pages"
        onSearchStateChange={this.updateState}
        root={{ Root }}
        ref={node => (this.node = node)}
      >
        <SearchBox collapse={collapse} onFocus={this.enableHits} />
        <HitsWrapper
          show={query.length > 0 && showHits}
          hitsAsGrid={hitsAsGrid}
        >
          <Stats
            translations={{
              stats: n => `${n} Ergebnis${n !== 1 ? `se` : ``}`,
            }}
          />
          {indices.map(({ name, title, hitComp }) => (
            <Index key={name} indexName={name}>
              {title && <h2>{title}</h2>}
              <Results>
                <Hits hitComponent={hitComps[hitComp](this.disableHits)} />
              </Results>
            </Index>
          ))}
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
