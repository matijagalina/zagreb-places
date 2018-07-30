import React, { Component } from 'react';

class Search extends Component {

  sendValueChange(event) {
    this.props.input(event.target.value)
  }

  render() {
    const { markers } = this.props
    return (
      <div className='search-container'>
        <h2>SEARCH</h2>
        <div className='search-container-inner'>
          <input
            role='search'
            type='text'
            placeholder='Search for a place'
            value={this.props.value}
            onChange={(event) => this.sendValueChange(event)} />
          <ul className='places-list'>
            {
              markers.filter(marker => marker.getVisible()).map((marker, index) => (
                <li
                  key={index}>
                  {marker.title}
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default Search