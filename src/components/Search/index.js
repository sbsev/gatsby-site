import React, { Component } from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  SearchBox,
  InfiniteHits,
  Highlight,
  PoweredBy,
} from 'react-instantsearch-dom'
import { Link } from 'gatsby'

import { Container, SearchWrapper, HitsWrapper, Loupe } from './styles'

const searchClient = algoliasearch(
  'T0ZLKGU1XK',
  '2bba2dc22c305d8a0472c4a76690093e'
)

const Hit = ({ hit }) => (
  <div>
    <Link to={hit.slug}>
      <h3>
        <Highlight attribute="title.title" hit={hit} />
      </h3>
    </Link>
    <Highlight attribute="body.data.excerpt" hit={hit} />
  </div>
)

export default class Search extends Component {
  state = { query: ``, showInput: false }

  stateChange = state => {
    this.setState(state)
  }

  toggleInput = () => {
    this.setState({ showInput: !this.state.showInput })
    console.log('state :', this.state)
  }

  render() {
    return (
      <Container>
        <Loupe onClick={this.toggleInput} />
        <SearchWrapper show={this.state.showInput}>
          <InstantSearch
            indexName="Pages"
            searchClient={searchClient}
            onSearchStateChange={this.stateChange}
          >
            <SearchBox translations={{ placeholder: `Suche` }} />
            <HitsWrapper show={this.state.query.length > 0}>
              <InfiniteHits hitComponent={Hit} />
              <PoweredBy />
            </HitsWrapper>
          </InstantSearch>
        </SearchWrapper>
      </Container>
    )
  }
}
