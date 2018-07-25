import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div className='search'>
        <h2>Search</h2>
        <div>
          <form className='search-form'>
            <input type="text" placeholder='Search for the place'/>
            <input type="submit"/>
          </form>
        </div>
      </div>
    );
  }
}

export default Search;