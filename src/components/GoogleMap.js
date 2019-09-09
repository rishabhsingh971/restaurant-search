import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Info from './Info';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  mapContainer: {
    position: 'relative',
  },
  map: {
    height: '100vh',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    margin: 'auto',
  },
  searchIcon: {
    marginRight: 4
  }
};

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      place: null,
      status: null,
    };
    this.searchBoxRef = this.props.getSearchBoxRef();
    this.center = this.props.center;
    this.setStatus = this.props.setStatus;
    this.initMap = this.initMap.bind(this);
    this.handlePlaceChange = this.handlePlaceChange.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    const googleMapScript = document.createElement('script');
    const key = process.env.REACT_APP_GOOGLE_API_KEY;
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;

    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', this.initMap);
  }

  componentDidUpdate(prevProps) {
    if (this.props.center !== prevProps.center) {
      this.handlePlaceChange(this.props.center);
    }
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

    // for dummy result
    const {dummyResults} = this.props;
    if (dummyResults) {
      this.setCenter(dummyResults[0].geometry.location);
      this.createMarkers(dummyResults);
      this.props.onResultsUpdate(dummyResults, this.markers);
    }
  }

  createGoogleMap() {
    return new window.google.maps.Map(document.getElementById('google-map'), {
      zoom: 13,
      center: this.center,
      mapTypeControl: false,
      panControl: true,
      zoomControl: true,
      streetViewControl: false
    });
  }

  // Create the search box and link it to the UI element.
  createSearchBox() {
    const searchBoxNode = this.searchBoxRef.current;;
    const input = searchBoxNode.childNodes[0];

    // Create the autocomplete object and associate it with the UI input control.
    const searchBox = new window.google.maps.places.Autocomplete(input, {
      bounds: this.map.getBounds(),
    });

    // Bias the SearchBox results towards current map's viewport.
    this.map.addListener('bounds_changed', () => {
      searchBox.setBounds(this.map.getBounds());
    });

    this.map.addListener('tilesloaded', () => {
      this.search();
    })

    searchBox.addListener('place_changed', this.handlePlaceChange);
    return searchBox;
  }

  // When the user selects a place, get the place details for the place and
  // zoom the map in on the place.
  handlePlaceChange(coords) {
    if (coords) {
      this.setCenter(coords)
    }
    else {
      const place = this.searchBox.getPlace();
      if (place.geometry) {
        this.setCenter(place.geometry.location);
      }
      else {
        this.setStatus('Location not found... please try again')
        return;
      }
    }
    this.search();
  }

  setCenter(center) {
    this.map.panTo(center);
    this.map.setZoom(16);
  }

  // Search for restaurants in the selected place, within the viewport of the this.map.
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
      else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        this.setStatus('No results for given location... please try another location');
      }
      else {
        this.setStatus(status);
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
      window.google.maps.event.addListener(this.markers[i], 'mouseover', this.showInfoWindow.bind(this, i));
      window.google.maps.event.addListener(this.markers[i], 'mouseout', this.hideInfoWindow.bind(this, i));
      window.google.maps.event.addListener(this.markers[i], 'focus', this.startBounce.bind(this, i));
      window.google.maps.event.addListener(this.markers[i], 'blur', this.stopBounce.bind(this, i));
      setTimeout(this.dropMarker(i), i * 100);
    }
  }

  startBounce(i) {
    this.markers[i].setAnimation(window.google.maps.Animation.BOUNCE);
  }

  stopBounce(i) {
    this.markers[i].setAnimation(null);
  }

  dropMarker(i) {
    return () => {
      this.markers && this.markers[i].setMap(this.map);
    };
  }

  // Show the information in an info window, anchored on the marker for the restaurant that the user selected.
  showInfoWindow(i) {
    const marker = this.markers[i];
    this.setState({
      place: marker.placeResult,
    })
    this.infoWindow.open(this.map, marker);
  }

  hideInfoWindow() {
    this.infoWindow.close();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div id="google-map-container" className={classes.mapContainer}>
        <div
          id="google-map"
          className={classes.map}
        />
        <Info place={this.state.place} />
        <Fab
          color="primary"
          size="medium"
          variant="extended"
          aria-label="search"
          className={classes.fab}
          onClick={this.search}
        >
          <SearchIcon className={classes.searchIcon} />
          Search this area
        </Fab>
      </div>
    )
  }
}

GoogleMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GoogleMap);