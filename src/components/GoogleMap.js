import React, {Component, createRef} from 'react';

export default class GoogleMap extends Component {
  mapRef = createRef();
  inputRef = createRef();

  componentDidMount() {
    const googleMapScript = document.createElement('script');
    const key = process.env.REACT_APP_GOOGLE_API_KEY;
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;

    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => this.initMap());
  }

  initMap() {
    this.map = this.createGoogleMap();
    this.searchBox = this.createSearchBox();
  }

  createGoogleMap() {
    return new window.google.maps.Map(this.mapRef.current, {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 13,
      streetViewControl: false
    })
  }

  createMarker(place) {
    if (!this.map || !place) return null;
    return new window.google.maps.Marker({
      position: place.geometry.location,
      map: this.map,
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

    // Create the autocomplete object and associate it with the UI input control.
    const searchBox = new window.google.maps.places.Autocomplete(input, {
      bounds: this.map.getBounds(),
    });

    // Bias the SearchBox results towards current map's viewport.
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds());
    });
    return searchBox;
  }

  render() {
    return (
      <div
        id="google-map"
        ref={this.mapRef}
      />
    )
  }
}