import React, {Component, createRef} from 'react';

export default class GoogleMap extends Component {
  googleMapRef = createRef();
  inputRef = createRef();

  componentDidMount() {
    const googleMapScript = document.createElement('script');
    const key = process.env.REACT_APP_GOOGLE_API_KEY;
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;

    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap();
      this.searchBox = this.createSearchBox();
    })
  }

  createGoogleMap() {
    return new window.google.maps.Map(this.googleMapRef.current, {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 13,
      streetViewControl: false
    })
  }

  createMarker(place) {
    if (!this.googleMap || !place) return null;
    return new window.google.maps.Marker({
      position: place.geometry.location,
      map: this.googleMap,
    });
  }

  // Create the search box and link it to the UI element.
  createSearchBox() {
    var input = document.createElement('input');
    const map = this.googleMap;
    Object.assign(input, {
      id: "searchbox",
      placeholder: "Enter a place",
      type: "text",
      ref: this.inputRef,
    })
    var searchBox = new window.google.maps.places.SearchBox(input);
    map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', () => {
      searchBox.setBounds(map.getBounds());
    });
    return searchBox;
  }

  render() {
    return (
      <div
        id="google-map"
        ref={this.googleMapRef}
      />
    )
  }
}