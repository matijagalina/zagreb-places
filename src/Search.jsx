import React, { Component } from 'react';
import List from './List';

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
          < List
          items={this.props.locations}
          />
        </div>
      </div>
    );
  }
}

export default Search;