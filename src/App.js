import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
// import Main from './Main';
// import Help from './Help';

class App extends Component {
  render() {
    return (
      <div classname='app'>
        <Route exact path='/' render={({ }) => (
          <h1>Test</h1>
        )}
        />
        <Route exact path='/help' render={({ }) => (
          <h1>Test</h1>
        )}
        />
      </div>
    );
  }
}

export default App;