import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {


  render() {

    const style = {
      width: '94%',
      height: '100%'
    }

    return (
      <Map
      style = {style}
      className='map-container'
      google={this.props.google}
        zoom={15}
        initialCenter={{
          lat: 45.814632,
          lng: 15.978783
        }}
      >
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDXKIs49jQueAbsamKl1tqffZq-n54bkuQ')
})(MapContainer)