import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import MapContainer from './MapContainer';
import Search from './Search';
import Help from './Help';

class App extends Component {
  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={({ history }) => (
          <div className="main">
            <Search />
            <MapContainer />
          </div>
        )}
        />
        <Route exact path='/help' render={({ history }) => (
          <Help/>
        )}
        />
      </div>
    );
  }
}

export default App;