import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import MapContainer from './MapContainer';
import Search from './Search';
import Title from './Title';

class App extends Component {

  state = {
    locations: [
      {
        name: 'Museum of Broken Relationships',
        id: 1,
        position: {
          lat: 45.814921,
          lng: 15.973434
        }
      },
      {
        name: 'Museum of Illusions',
        id: 2,
        position: {
          lat: 45.812978,
          lng: 15.966353
        }
      },
      {
        name: 'Tortureum Zagreb',
        id: 3,
        position: {
          lat: 45.814391,
          lng: 15.975747
        }
      },
      {
        name: 'Maksimir Park',
        id: 4,
        position: {
          lat: 45.819654,
          lng: 16.015640
        }
      },
      {
        name: 'Botanical Garden',
        id: 5,
        position: {
          lat: 45.804944,
          lng: 15.972202
        }
      },
    ],
    searchedPlaces: [],
    input: ''
  }

  handleSearch(places, input) {
    this.setState({
      searchedPlaces: places,
      input: input
    })
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={({ history }) => (
          <div>
            <div className='title-container'>
              <Title
                title='Zagreb places'
              />
            </div>
            <div className='main'>
              <div className='search-container'>
                <Search
                  locations={this.state.locations}
                  filter={(places, input) => this.handleSearch(places, input)}
                  query={this.state.input}
                />
              </div>
              <div className='map-container' >
                <MapContainer
                  locations={this.state.locations}
                  places={this.state.searchedPlaces}
                  input={this.state.input}
                />
              </div>
            </div>
          </div>
        )}
        />
      </div>
    );
  }
}

export default App;