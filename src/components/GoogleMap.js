import React, {Component, createRef} from 'react';
import Info from './Info';

export default class GoogleMap extends Component {
  mapRef = createRef();
  inputRef = createRef();

  constructor(props) {
    super(props);
    this.state = {
      place: null,
    };
  }

  componentDidMount() {
    const googleMapScript = document.createElement('script');
    const key = process.env.REACT_APP_GOOGLE_API_KEY;
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;

    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => this.initMap());
  }

  initMap() {
    this.markers = [];
    this.MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
    this.map = this.createGoogleMap();
    this.searchBox = this.createSearchBox();

    this.places = new window.google.maps.places.PlacesService(this.map);
    // Info window
    this.infoWindow = new window.google.maps.InfoWindow({
      content: document.getElementById('info-content')
    });
  }

  createGoogleMap() {
    return new window.google.maps.Map(document.getElementById('google-map'), {
      zoom: 13,
      center: {lat: 27, lng: 77},
      mapTypeControl: false,
      panControl: true,
      zoomControl: true,
      streetViewControl: false
    });
  }

  // Create the search box and link it to the UI element.
  createSearchBox() {
    const input = document.createElement('input');
    Object.assign(input, {
      id: "searchbox",
      placeholder: "Enter a place",
      type: "text",
      ref: this.inputRef,
    });

    this.map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(input);
    // Create the autocomplete object and associate it with the UI input control.
    const searchBox = new window.google.maps.places.Autocomplete(input, {
      bounds: this.map.getBounds(),
    });

    // Bias the SearchBox results towards current map's viewport.
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds());
    });

    searchBox.addListener('place_changed', () => this.onPlaceChanged());
    return searchBox;
  }

  // When the user selects a place, get the place details for the place and
  // zoom the map in on the place.
  onPlaceChanged() {
    var place = this.searchBox.getPlace();
    if (place.geometry) {
      this.map.panTo(place.geometry.location);
      this.map.setZoom(15);
      this.search();
    } else {
      document.getElementById('searchbox').placeholder = 'Enter a city';
    }
  }

  // Search for restaurants in the selected city, within the viewport of the this.map.
  search() {
    var search = {
      bounds: this.map.getBounds(),
      types: ['restaurant']
    };

    this.places.nearbySearch(search, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        this.clearMarkers();
        this.createMarkers(results);
        this.props.onResultsUpdate(results, this.markers);
      }
    });
  }

  clearMarkers() {
    if (!this.markers) return;
    for (var i = 0; i < this.markers.length; i++) {
      if (this.markers[i]) {
        this.markers[i].setMap(null);
      }
    }
    this.markers = [];
  }

  createMarkers(results) {
    // Create a marker for each restaurant found, and
    // assign a letter of the alphabetic to each marker icon.
    for (var i = 0; i < results.length; i++) {
      var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
      var markerIcon = this.MARKER_PATH + markerLetter + '.png';
      // Use marker animation to drop the icons incrementally on the this.map.
      this.markers[i] = new window.google.maps.Marker({
        position: results[i].geometry.location,
        animation: window.google.maps.Animation.DROP,
        icon: markerIcon
      });
      // If the user clicks a restaurant marker, show the details of that restaurant
      // in an info window.
      this.markers[i].placeResult = results[i];
      window.google.maps.event.addListener(this.markers[i], 'click', this.showInfoWindow.bind(this, i));
      setTimeout(this.dropMarker(i), i * 100);
    }
  }
  dropMarker(i) {
    return () => {
      this.markers && this.markers[i].setMap(this.map);
    };
  }

  // Get the place details for a restaurant. Show the information in an info window,
  // anchored on the marker for the restaurant that the user selected.
  showInfoWindow(i) {
    const marker = this.markers[i];
    this.places.getDetails({placeId: marker.placeResult.place_id},
      (place, status) => {
        if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
          return;
        }
        this.infoWindow.open(this.map, marker);
        this.setState({
          place,
        })
      });
  }

  render() {
    return (
      <div id="google-map-container">
        <div
          id="google-map"
          ref={this.mapRef}
        />
        <Info place={this.state.place} />
      </div>
    )
  }
}