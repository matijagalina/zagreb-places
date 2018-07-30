import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import './App.css'
import Main from './Main'
import Title from './Title'

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
      }
    ]
  }

  render() {
    return (
      <div>
        <Title />
        <Main
          google={this.props.google}
          locations={this.state.locations}
          />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDXKIs49jQueAbsamKl1tqffZq-n54bkuQ'
})(App)