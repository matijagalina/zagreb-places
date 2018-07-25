import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import MapContainer from './MapContainer';
import Search from './Search';
import Title from './Title';
import Footer from './Footer';

class App extends Component {
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
                <Search />
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