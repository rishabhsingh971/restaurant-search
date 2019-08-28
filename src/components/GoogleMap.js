import React, {Component, createRef} from 'react';

export default class GoogleMap extends Component {
  googleMapRef = createRef()

  componentDidMount() {
    const googleMapScript = document.createElement('script');
    const key = process.env.REACT_APP_GOOGLE_API_KEY;
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;

    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      this.googleMap = this.createGoogleMap();
    })
  }

  createGoogleMap() {
    new window.google.maps.Map(this.googleMapRef.current, {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11,
      disableDefaultUI: false,
    })
  }

  createMarker() {
    new window.google.maps.Marker({
      position: {lat: 43.642567, lng: -79.387054},
      map: this.googleMap,
    });
  }

  render() {
    return (
      <div
        id="google-map"
        className={this.props.className}
        ref={this.googleMapRef}
      />
    )
  }
}