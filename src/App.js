import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react'
import './App.css'
import Main from './Main'
import Title from './Title'
import * as FourSquare from './FourSquare'
import * as locationsList from './Locations'

class App extends Component {

  state = {
    locations: locationsList.data,
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