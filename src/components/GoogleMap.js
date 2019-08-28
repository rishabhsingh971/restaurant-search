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
    this.markers = [];
    this.MARKER_PATH = 'https://developers.google.com/maps/documentation/javascript/images/marker_green';
    this.hostnameRegexp = new RegExp('^https?://.+?/');


    this.map = this.createGoogleMap();
    this.searchBox = this.createSearchBox();

    this.places = new window.google.maps.places.PlacesService(this.map);
    // Info window
    // this.infoWindow = new window.google.maps.InfoWindow({
    //   content: document.getElementById('info-content')
    // });

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
        // this.clearResults();
        this.clearMarkers();
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
          window.google.maps.event.addListener(this.markers[i], 'click', this.showInfoWindow);
          setTimeout(this.dropMarker(i), i * 100);
          // this.addResult(results[i], i);
        }
      }
    });
  }

  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      if (this.markers[i]) {
        this.markers[i].setMap(null);
      }
    }
    this.markers = [];
  }

  dropMarker(i) {
    return function () {
      this.markers && this.markers[i].setMap(this.map);
    };
  }

  // addResult(result, i) {
  //   var results = document.getElementById('results');
  //   var markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
  //   var markerIcon = this.MARKER_PATH + markerLetter + '.png';

  //   var tr = document.createElement('tr');
  //   tr.style.backgroundColor = (i % 2 === 0 ? '#F0F0F0' : '#FFFFFF');
  //   tr.onclick = function () {
  //     window.google.maps.event.trigger(this.markers[i], 'click');
  //   };

  //   var iconTd = document.createElement('td');
  //   var nameTd = document.createElement('td');
  //   var icon = document.createElement('img');
  //   icon.src = markerIcon;
  //   icon.setAttribute('class', 'placeIcon');
  //   icon.setAttribute('className', 'placeIcon');
  //   var name = document.createTextNode(result.name);
  //   iconTd.appendChild(icon);
  //   nameTd.appendChild(name);
  //   tr.appendChild(iconTd);
  //   tr.appendChild(nameTd);
  //   results.appendChild(tr);
  // }

  // clearResults() {
  //   var results = document.getElementById('results');
  //   while (results.childNodes[0]) {
  //     results.removeChild(results.childNodes[0]);
  //   }
  // }

  // Get the place details for a restaurant. Show the information in an info window,
  // anchored on the marker for the restaurant that the user selected.
  // showInfoWindow() {
  //   var marker = this;
  //   this.places.getDetails({placeId: marker.placeResult.place_id},
  //     function (place, status) {
  //       if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
  //         return;
  //       }
  //       this.infoWindow.open(this.map, marker);
  //       this.buildIWContent(place);
  //     });
  // }

  // Load the place information into the HTML elements used by the info window.
  // buildIWContent(place) {
  //   document.getElementById('iw-icon').innerHTML = '<img class="hotelIcon" ' +
  //     'src="' + place.icon + '"/>';
  //   document.getElementById('iw-url').innerHTML = '<b><a href="' + place.url +
  //     '">' + place.name + '</a></b>';
  //   document.getElementById('iw-address').textContent = place.vicinity;

  //   if (place.formatted_phone_number) {
  //     document.getElementById('iw-phone-row').style.display = '';
  //     document.getElementById('iw-phone').textContent =
  //       place.formatted_phone_number;
  //   } else {
  //     document.getElementById('iw-phone-row').style.display = 'none';
  //   }

  //   // Assign a five-star rating to the restaurant, using a black star ('&#10029;')
  //   // to indicate the rating the restaurant has earned, and a white star ('&#10025;')
  //   // for the rating points not achieved.
  //   if (place.rating) {
  //     var ratingHtml = '';
  //     for (var i = 0; i < 5; i++) {
  //       if (place.rating < (i + 0.5)) {
  //         ratingHtml += '&#10025;';
  //       } else {
  //         ratingHtml += '&#10029;';
  //       }
  //       document.getElementById('iw-rating-row').style.display = '';
  //       document.getElementById('iw-rating').innerHTML = ratingHtml;
  //     }
  //   } else {
  //     document.getElementById('iw-rating-row').style.display = 'none';
  //   }

  //   // The regexp isolates the first part of the URL (domain plus subdomain)
  //   // to give a short URL for displaying in the info window.
  //   if (place.website) {
  //     var fullUrl = place.website;
  //     var website = this.hostnameRegexp.exec(place.website);
  //     if (website === null) {
  //       website = 'http://' + place.website + '/';
  //       fullUrl = website;
  //     }
  //     document.getElementById('iw-website-row').style.display = '';
  //     document.getElementById('iw-website').textContent = website;
  //   } else {
  //     document.getElementById('iw-website-row').style.display = 'none';
  //   }
  // }

  createMarker(place) {
    if (!this.map || !place) return null;
    return new window.google.maps.Marker({
      position: place.geometry.location,
      map: this.map,
    });
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