import React, { Component } from 'react'
import Search from './Search'
import escapeRegExp from 'escape-string-regexp'

class Main extends Component {

  state = {
    query: '',
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow()
  }

  // created variable to store map and to be globally accessible
  map = undefined

  componentDidMount() {
    this.startMap()
    this.addListenersToListItems()
  }

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
      this.createMarkers()
    } else {
      const $mapContainer = document.getElementById('map')
      let $errorContainer = document.createElement('div')
      $errorContainer.innerHTML = '<h2>There was an error when creating map. Please try again later</h2>'
      $mapContainer.appendChild($errorContainer)
      alert('Google map failed to display!')
    }
  }

  handleInputChange = (value) => {
    this.setState({
      query: value
    })
  }

  addListenersToListItems = () => {
    const list = document.querySelector('.places-list')
    list.addEventListener('click', event => {
      if (event.target.nodeName === 'LI') {
        this.showInfowindow(event)
      }
    })
  }

  showInfowindow = (event) => {
    const { markers, infowindow } = this.state
    const match = new RegExp(escapeRegExp(event.target.innerText), 'i')
    const selectedPlace = markers.filter(marker => match.test(marker.title))
    this.map.setCenter(selectedPlace[0].getPosition())
    this.buildInfoWindowContent(selectedPlace[0], infowindow)
  }

  createMarkers = () => {
    const { google } = this.props
    let { infowindow } = this.state

    this.props.locations.forEach((location) => {
      const marker = new google.maps.Marker({
        position: {
          lat: location.position.lat,
          lng: location.position.lng
        },
        map: this.map,
        title: location.name
      })

      marker.addListener('click', () => {
        this.map.setCenter(marker.getPosition())
        this.buildInfoWindowContent(marker, infowindow)
      })
      this.setState((state) => ({
        markers: state.markers.concat([marker])
      }))
    })
  }

  buildInfoWindowContent = (marker, infowindow) => {
    const { google } = this.props
    const { markers } = this.state

    if (!!infowindow.marker) {
      const marker = markers.filter(marker => marker.title === infowindow.marker.title)
      marker[0].setAnimation(null);
    }

    if (infowindow.marker !== marker) {
      infowindow.marker = marker

      // get data
      const content = this.getLocationData(marker)
      const errorPlaceholderText = 'not availaible'

      if (content === null) {
        infowindow.setContent('<h2>Content is currently unavailaible</h2>')
      } else {

        let rating = !!content.rating ? content.rating : errorPlaceholderText
        let hours = !!content.hours ? content.hours.timeframes[0].open[0].renderedTime : errorPlaceholderText

        infowindow.setContent('<div class="infowindow-container">' +
                              '<h3>' + content.name + '</h3>' +
                              '<div class="infowindow-inner">' +
                                '<img src=' + content.bestPhoto.prefix + '120x120' + content.bestPhoto.suffix +
                                 ' alt="photo from ' + content.name + '">' +
                                '<div class="infowindow-details">' +
                                  '<p>' + content.location.address + '</p>' +
                                  '<p><a href=' + content.shortUrl + ' target="_blank">Visit on FourSquare</a></p>' +
                                  '<p>Rating: ' + rating.toString() + '</p>' +
                                  '<p>Hours:<br>' + hours + '</p>' +
                                '</div>' +
                              '</div>' +
                            '</div>')
      }

      marker.setAnimation(google.maps.Animation.BOUNCE)
      infowindow.open(this.map, marker)

      infowindow.addListener('closeclick', function () {
        marker.setAnimation(null)
        infowindow.marker = null
      })
    }
  }

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
          />
          <div className='map-container' id='map' role='application' ></div>
        </div>
      </div>
    )
  }
}

export default Main