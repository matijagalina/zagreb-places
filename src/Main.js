import React, { Component } from 'react'
import Search from './Search'
import escapeRegExp from 'escape-string-regexp'

class Main extends Component {

  state = {
    query: '',
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow()
  }

  // created variable to store map and to be globally accessible inside component
  map = undefined

  componentDidMount() {
    this.startMap()
  }

  // set the map and it's settings to the #map container
  startMap = () => {
    if (!!this.props && !!this.props.google) {
      const { google } = this.props

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 45.814632,
          lng: 15.978783
        },
        zoom: 14,
        fullscreenControl: false,
        mapTypeControl: false
      })
      // create markers on the map and add onclick listeners to list items
      this.createMarkers()
      // this.addListenersToListItems()
    } else {
      // error handling
      const $mapContainer = document.getElementById('map')
      let $errorContainer = document.createElement('div')
      $errorContainer.innerHTML = '<h2>There was an error when creating map. Please try again later</h2>'
      $mapContainer.appendChild($errorContainer)
      alert('Google map failed to display!')
    }
  }

  // handle received query via Search component props
  handleInputChange = (value) => {
    this.setState({
      query: value
    })
  }

  // // add listeners to list items
  // addListenersToListItems = () => {
  //   const list = document.querySelector('.places-list')
  //   list.addEventListener('click', event => {
  //     if (event.target.nodeName === 'LI') {
  //       this.showInfowindow(event)
  //     }
  //   })
  // }

  // list items listener callback - set map center to clicked location and open the infowindow with foursquare content
  showInfowindow = (event) => {
    const { markers } = this.state
    const match = new RegExp(escapeRegExp(event.target.innerText), 'i')
    const selectedPlace = markers.filter(marker => match.test(marker.title))
    this.map.setCenter(selectedPlace[0].getPosition())
    this.buildInfoWindowContent(selectedPlace[0])
  }

  // create markers on map going through all the locations and creating the marker for each one
  createMarkers = () => {
    const { google } = this.props

    this.props.locations.forEach((location) => {
      const marker = new google.maps.Marker({
        position: {
          lat: location.position.lat,
          lng: location.position.lng
        },
        map: this.map,
        title: location.name
      })

      // add same behaviour to clicked marker as in clicked list item location
      marker.addListener('click', () => {
        this.map.setCenter(marker.getPosition())
        this.buildInfoWindowContent(marker)
      })
      // add markers to state
      this.setState((state) => ({
        markers: state.markers.concat([marker])
      }))
    })
  }

  // create infowindow with foursquare content
  buildInfoWindowContent = (marker) => {
    const { google } = this.props
    const { markers, infowindow } = this.state

    // stop animation on the marker if there is one with open infowindow
    if (!!infowindow.marker) {
      const marker = markers.filter(marker => marker.title === infowindow.marker.title)
      marker[0].setAnimation(null);
    }

    // create infowindow on a marker
    if (infowindow.marker !== marker) {
      infowindow.marker = marker

      // get data for markers infowindow and set its content
      const content = this.getLocationData(marker)

      if (content === null) {
        infowindow.setContent('<h2>Content is currently unavailaible</h2>')
      } else {

        const errorPlaceholderText = 'not availaible'
        let rating = !!content.rating ? content.rating : errorPlaceholderText
        let hours = !!content.hours ? content.hours.timeframes[0].open[0].renderedTime : errorPlaceholderText

        infowindow.setContent('<div role="contentinfo" tabIndex="0" class="infowindow-container">' +
                              '<h3 tabIndex="0">' + content.name + '</h3>' +
                              '<div class="infowindow-inner">' +
                                '<img src=' + content.bestPhoto.prefix + '120x120' + content.bestPhoto.suffix +
                                 ' alt="photo from ' + content.name + '">' +
                                '<div class="infowindow-details">' +
                                  '<p tabIndex="0">' + content.location.address + '</p>' +
                                  '<p><a href=' + content.shortUrl + ' target="_blank">Visit on FourSquare</a></p>' +
                                  '<p tabIndex="0">Rating: ' + rating.toString() + '</p>' +
                                  '<p tabIndex="0">Hours:<br>' + hours + '</p>' +
                                '</div>' +
                              '</div>' +
                            '</div>')
      }

      // add bounce animation to marker and open infowindow
      marker.setAnimation(google.maps.Animation.BOUNCE)
      infowindow.open(this.map, marker)

      // add listener to closing infowindow - stop animation, close infowindow
      infowindow.addListener('closeclick', function () {
        marker.setAnimation(null)
        infowindow.marker = null
      })
    }
  }

  // get data for a marker from local storage or locationData props
  getLocationData = (marker) => {
    const { locationData } = this.props
    const localStorageData = JSON.parse(localStorage.getItem('locationData')) || []
    let data

    if (!!localStorageData && localStorageData.length > 0) {
      localStorageData.forEach(place => {
        if (place.name === marker.title) {
          data = place.data
        }
      })
      return data
    }

    if (!localStorageData || localStorageData.length === 0) {
      locationData.forEach(place => {
        if (place.name === marker.title) {
          data = place.data
        }
      })
      return data
    } else {
      return null
    }
  }

  render() {
    const { query, markers, infowindow } = this.state

    // handle list query behaviour - based on query set matched markers visible and hide others
    if (!!query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      this.props.locations.forEach((location, index) => {
        if (match.test(location.name)) {
          markers[index].setVisible(true)
        } else {
          // close active infowindow if there is one
          if (infowindow.marker === markers[index]) {
            infowindow.close()
          }
          markers[index].setVisible(false)
        }
      })
    } else {
      // if no query or empty input field show all markers
      this.props.locations.forEach((location, index) => {
        if (!!markers && markers.length !== 0) {
          markers[index].setVisible(true)
        }
      })
    }

    return (
      <div>
        <div className='main-container'>
          <Search
            value={this.state.value}
            input={(value) => this.handleInputChange(value)}
            markers={markers}
            sendClickData={(event) => this.showInfowindow(event)}
          />
          <div className='map-container' id='map' role='application' ></div>
        </div>
      </div>
    )
  }
}

export default Main