import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import './App.css'
import Main from './Main'
import Title from './Title'
import * as FourSquare from './FourSquare'

class App extends Component {

  state = {
    locations: [
      {
        name: 'Museum of Broken Relationships',
        id: '4cab48e6f47ea14351508a21',
        position: {
          lat: 45.814921,
          lng: 15.973434
        }
      },
      {
        name: 'Muzej Iluzija',
        id: '4c8d04108018a1cd9d90f1d2',
        position: {
          lat: 45.812978,
          lng: 15.966353
        }
      },
      {
        name: 'Tortureum- Museum of torture',
        id: '558ae639498ea3f01851ff03',
        position: {
          lat: 45.814391,
          lng: 15.975747
        }
      },
      {
        name: 'Park Maksimir',
        id: '55a127d6498e2b2b8f75a31d',
        position: {
          lat: 45.819654,
          lng: 16.015640
        }
      },
      {
        name: 'Botanical garden',
        id: '583ca39da55db039f593aea1',
        position: {
          lat: 45.804944,
          lng: 15.972202
        }
      }
    ],
    locationData: []
  }

  componentDidMount() {
    this.getVenueData()
  }


  getVenueData = () => {

    // if opened for the first time fetch locations data from foursquare and store it to the local storage
    // after that use the data from local storage to limit the use of foursquare API because of small venue details endpoint quota ( 50/day)

    const { locations } = this.state
    let localStorageData;

    if (!!localStorage.getItem('locationData')) {
      localStorageData = JSON.parse(localStorage.getItem('locationData'))
    } else {
      localStorageData = []
    }

    if (!!localStorageData && localStorageData.length > 0) {
      this.setState({
        locationData: localStorageData
      })
    }

    if (!localStorageData || localStorageData.length === 0) {

      // use foursquare fetch function on every locations item to get data
      locations.forEach(location => {
        FourSquare.getVenueDetails(location.id)
          .then(data => {
            if (!data || !data.response.venue) {
              alert('Data request from Foursquare API failed!')
              return;
            } else {
              this.setState(((state) => ({
                locationData: state.locationData.concat([{
                  data: data.response.venue,
                  name: data.response.venue.name
                }])
              })))
              localStorage.setItem('locationData', JSON.stringify(this.state.locationData))
            }
          })
      })
    }
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