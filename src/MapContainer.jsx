import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {


  render() {

    const style = {
      width: '70%',
      height: '100%',
      left: 'unset',
      right: 'unset'
    }

    return (
      <Map
        style={style}
        className='map'
        google={this.props.google}
        zoom={14}
        initialCenter={{
          lat: 45.814632,
          lng: 15.978783
        }}
      >
      {
        !this.props.input && this.props.locations.map(location => (
          <Marker
            key={location.name}
            name={location.name}
            position={{
              lat: location.position.lat,
              lng: location.position.lng
            }}
          />
        ))
      }
        {
          !!this.props.input && !!this.props.places && this.props.places.length > 0 && this.props.places.map(location => (
            <Marker
              key={location.name}
              name={location.name}
              position={{
                lat: location.position.lat,
                lng: location.position.lng
              }}
            />
          ))
        }
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDXKIs49jQueAbsamKl1tqffZq-n54bkuQ')
})(MapContainer)