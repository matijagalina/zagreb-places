import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import MapContainer from './MapContainer';
import Search from './Search';
import Title from './Title';
import Footer from './Footer';

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
          long: 15.966353
        }
      },
      {
        name: 'Tortureum Zagreb',
        id: 3,
        position: {
          lat: 45.814391,
          long: 15.975747
        }
      },
      {
        name: 'Maksimir Park',
        id: 4,
        position: {
          lat: 45.819654,
          long: 16.015640
        }
      },
      {
        name: 'The Museum of Naive Art',
        id: 5,
        position: {
          lat: 45.815363,
          long: 15.973288
        }
      },
    ]
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
                />
              </div>
              <div className='map-container' >
                <MapContainer />
              </div>
            </div>
            <div className='footer-container' >
                <Footer />
              </div>
          </div>
        )}
        />
      </div>
    );
  }
}

export default App;