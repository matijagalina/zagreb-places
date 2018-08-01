import React, { Component } from 'react';

class Search extends Component {

  componentDidMount() {
    this.addListenersToListItems()
  }

  // send query value from input to parent component for state update
  sendValueChange(event) {
    this.props.input(event.target.value)
  }

  // add listeners to list items
  addListenersToListItems = () => {
    const list = document.querySelector('.places-list')
    list.addEventListener('click', event => {
      if (event.target.nodeName === 'LI') {
        this.props.sendClickData(event)
      }
    })
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
              // build a list from visible marker names
              markers.filter(marker => marker.getVisible()).map((marker, index) => (
                <li tabIndex="0" key={marker.title}>
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