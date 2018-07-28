import React, { Component } from 'react';
import List from './List';
import escapeRegExp from 'escape-string-regexp';

class Search extends Component {

  state = {
    query: ''
  }

  handleInput(input) {
    this.setState({
      query: input
    },
      function () {
        let searchedPlaces;
        if (!!this.state.query) {
          const match = new RegExp(escapeRegExp(this.state.query), 'i');
          searchedPlaces = this.props.locations.filter((location) =>
            match.test(location.name))
        }
        this.props.filter(searchedPlaces, input);
      })
  }

  render() {

    let searchedPlaces;
    if (!!this.props.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i');
      searchedPlaces = this.props.locations.filter((location) =>
        match.test(location.name))
    }

    return (
      <div className='search'>
        <h2>Search</h2>
        <div>
          <form className='search-form'>
            <input
              type="text"
              placeholder='Search for the place'
              onChange={(event) => this.handleInput(event.target.value)} />
          </form>
          < List
            items={
              (!!this.props.query) ? searchedPlaces : this.props.locations
            }
          />
        </div>
      </div>
    );
  }
}

export default Search;