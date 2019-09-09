import React from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMap from './components/GoogleMap';
import Restaurants from './components/Restaurants';
import SearchBox from './components/SearchBox';
import Snackbar from './components/Snackbar';
import {Grid} from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: getDummyRestaurants(),
      markers: null,
      center: null,
      status: null,
    }

    this.searchBoxRef = React.createRef();
    this.handleRestaurantClick = this.handleRestaurantClick.bind(this);
    this.handleRestaurantHover = this.handleRestaurantHover.bind(this);
    this.handleRestaurantsUpdate = this.handleRestaurantsUpdate.bind(this);
    this.handleCurrentLocationSearch = this.handleCurrentLocationSearch.bind(this);
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    this.setStatus = this.setStatus.bind(this);
  }

  handleCurrentLocationSearch() {
    if (!navigator.geolocation) {
      this.setStatus('Geolocation is not supported by your browser');
    } else {
      this.setStatus('Locating...');
      navigator.geolocation.getCurrentPosition(
        ({coords}) => this.setState({center: coords}),
        () => this.setStatus('Unable to retrieve your location... please try again.'),
      );
    }
  }

  render() {
    return (
      <Grid container spacing={0} style={{height: '100vh'}}>
        <Grid item sm={12} md={3} style={{maxHeight: '100%', display: 'flex', flexDirection: 'column'}}>
          <Grid container className="header">
            <img className="logo" xs={3} src={logo} alt="logo" />
            <span className="name" xs={9}>Restaurant Search</span>
          </Grid>
          <Grid container className="searchbox-container">
            <SearchBox
              ref={this.searchBoxRef}
              placeholder="Search a location"
              onCurrentLocationClick={this.handleCurrentLocationSearch}
            />
          </Grid>
          <Restaurants
            restaurants={this.state.restaurants}
            onClick={this.handleRestaurantClick}
            onMouseEnter={(i) => this.handleRestaurantHover(i, true)}
            onMouseLeave={(i) => this.handleRestaurantHover(i, false)}
          />
          <Snackbar
            message={this.state.status}
            onClose={this.handleSnackbarClose}
          />
        </Grid>
        <Grid item sm={false} md={9}>
          <GoogleMap
            dummyResults={this.state.restaurants}
            onResultsUpdate={this.handleRestaurantsUpdate}
            center={this.state.center}
            getSearchBoxRef = {() => this.searchBoxRef}
            setStatus= {this.setStatus}
          />
        </Grid>
      </Grid>
    );
  }

  handleRestaurantClick(index) {
    if (!window.google) return;
    window.google.maps.event.trigger(this.state.markers[index], 'click');
  }

  handleRestaurantHover(index, enter = true) {
    if (!window.google) return;
    window.google.maps.event.trigger(this.state.markers[index], enter ? 'focus' : 'blur');
  }

  handleRestaurantsUpdate(restaurants, markers) {
    this.setState({
      restaurants,
      markers,
    })
  }

  setStatus(status) {
    this.setState({status});
  }

  handleSnackbarClose() {
    this.setState({status: null});
  }
}

/*
  zoom: 15,
  center: {lat: 38.9059316, lng: -77.036856},
*/
function getDummyRestaurants() {
  return [
    {
      "geometry": {
        "location": {
          "lat": 38.9059316,
          "lng": -77.036856
        },
        "viewport": {
          "ha": {
            "g": 38.90458736970849,
            "h": 38.90728533029149
          },
          "da": {
            "g": -77.03813023029147,
            "h": -77.03543226970851
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "4972e78b0cc712e9f3365ab2a1579576bef2e1f8",
      "name": "The Jefferson",
      "opening_hours": {},
      "photos": [
        {
          "height": 2000,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/100555550922889591124/photos\">The Jefferson</a>"
          ],
          "width": 3000
        }
      ],
      "place_id": "ChIJOYdIe7-3t4kREprpMMO1BKM",
      "plus_code": {
        "compound_code": "WX47+97 Washington, District of Columbia, United States",
        "global_code": "87C4WX47+97"
      },
      "price_level": 4,
      "rating": 4.7,
      "reference": "ChIJOYdIe7-3t4kREprpMMO1BKM",
      "scope": "GOOGLE",
      "types": [
        "spa",
        "lodging",
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 430,
      "vicinity": "1200 16th Street Northwest, Washington",
      "html_attributions": []
    },
    {
      "geometry": {
        "location": {
          "lat": 38.906329,
          "lng": -77.04191500000002
        },
        "viewport": {
          "ha": {
            "g": 38.9050515697085,
            "h": 38.90774953029149
          },
          "da": {
            "g": -77.04314738029154,
            "h": -77.04044941970847
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "527596daf24639daa6b3261b34e6d876b46ee3ca",
      "name": "Shake Shack",
      "opening_hours": {},
      "photos": [
        {
          "height": 2988,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/106588545817010894558/photos\">charles g</a>"
          ],
          "width": 5312
        }
      ],
      "place_id": "ChIJK8BXfbi3t4kR1dPf6WP7Bgc",
      "plus_code": {
        "compound_code": "WX45+G6 Washington, District of Columbia, United States",
        "global_code": "87C4WX45+G6"
      },
      "price_level": 2,
      "rating": 4.2,
      "reference": "ChIJK8BXfbi3t4kR1dPf6WP7Bgc",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "store",
        "establishment"
      ],
      "user_ratings_total": 1989,
      "vicinity": "1216 18th Street Northwest, Washington",
      "html_attributions": []
    },
    {
      "geometry": {
        "location": {
          "lat": 38.90394069999999,
          "lng": -77.0380103
        },
        "viewport": {
          "ha": {
            "g": 38.9024860197085,
            "h": 38.9051839802915
          },
          "da": {
            "g": -77.0393704802915,
            "h": -77.03667251970853
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "ca4aa4f6d75ba4b5db907dd7bcc826fd7e3a68cf",
      "name": "Barcode",
      "opening_hours": {},
      "photos": [
        {
          "height": 853,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/101671454299514769261/photos\">Barcode</a>"
          ],
          "width": 1280
        }
      ],
      "place_id": "ChIJtZtGJ7-3t4kR4_v7WdDfvFQ",
      "plus_code": {
        "compound_code": "WX36+HQ Washington, District of Columbia, United States",
        "global_code": "87C4WX36+HQ"
      },
      "price_level": 2,
      "rating": 3.8,
      "reference": "ChIJtZtGJ7-3t4kR4_v7WdDfvFQ",
      "scope": "GOOGLE",
      "types": [
        "night_club",
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 915,
      "vicinity": "1101 17th Street Northwest, Washington",
      "html_attributions": []
    },
    {
      "geometry": {
        "location": {
          "lat": 38.9084863,
          "lng": -77.03172189999998
        },
        "viewport": {
          "ha": {
            "g": 38.9071421697085,
            "h": 38.9098401302915
          },
          "da": {
            "g": -77.03318333029154,
            "h": -77.03048536970846
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/bar-71.png",
      "id": "a4dc02742506b8e6df5b5ebdaecd037a13df0336",
      "name": "ChurchKey",
      "opening_hours": {},
      "photos": [
        {
          "height": 682,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/118082854256050169480/photos\">ChurchKey</a>"
          ],
          "width": 1024
        }
      ],
      "place_id": "ChIJEeAiX-q3t4kR-VwuFaxkRxM",
      "plus_code": {
        "compound_code": "WX59+98 Washington, District of Columbia, United States",
        "global_code": "87C4WX59+98"
      },
      "price_level": 2,
      "rating": 4.5,
      "reference": "ChIJEeAiX-q3t4kR-VwuFaxkRxM",
      "scope": "GOOGLE",
      "types": [
        "bar",
        "night_club",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 1523,
      "vicinity": "1337 14th Street Northwest, Washington",
      "html_attributions": []
    },
    {
      "geometry": {
        "location": {
          "lat": 38.9043232,
          "lng": -77.0331865
        },
        "viewport": {
          "ha": {
            "g": 38.9029689697085,
            "h": 38.9056669302915
          },
          "da": {
            "g": -77.03431163029148,
            "h": -77.03161366970846
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "ead9d8d3d7b8b7f7c15caed29a915fc1ac5669ff",
      "name": "Lincoln",
      "opening_hours": {},
      "photos": [
        {
          "height": 3840,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/107079900094154375828/photos\">Fanette Rickert</a>"
          ],
          "width": 5760
        }
      ],
      "place_id": "ChIJxUmtY5W3t4kRc6DhUq_pEdc",
      "plus_code": {
        "compound_code": "WX38+PP Washington, District of Columbia, United States",
        "global_code": "87C4WX38+PP"
      },
      "price_level": 2,
      "rating": 4.1,
      "reference": "ChIJxUmtY5W3t4kRc6DhUq_pEdc",
      "scope": "GOOGLE",
      "types": [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 760,
      "vicinity": "1110 Vermont Avenue Northwest, Washington",
      "html_attributions": []
    },
    {
      "geometry": {
        "location": {
          "lat": 38.9032169,
          "lng": -77.0401812
        },
        "viewport": {
          "ha": {
            "g": 38.9021393197085,
            "h": 38.9048372802915
          },
          "da": {
            "g": -77.04165278029149,
            "h": -77.03895481970847
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "9c883f6002cb9785b5c5c93151bfbcdf2d018c19",
      "name": "Morton's The Steakhouse",
      "opening_hours": {},
      "photos": [
        {
          "height": 1179,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/105207117816283634559/photos\">Morton&#39;s The Steakhouse</a>"
          ],
          "width": 1766
        }
      ],
      "place_id": "ChIJL91LFrm3t4kR_cddUSMqf9Q",
      "plus_code": {
        "compound_code": "WX35+7W Washington, District of Columbia, United States",
        "global_code": "87C4WX35+7W"
      },
      "price_level": 4,
      "rating": 4.4,
      "reference": "ChIJL91LFrm3t4kR_cddUSMqf9Q",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 297,
      "vicinity": "1050 Connecticut Avenue Northwest, Washington",
      "html_attributions": []
    },
    {
      "geometry": {
        "location": {
          "lat": 38.9018744,
          "lng": -77.03476409999996
        },
        "viewport": {
          "ha": {
            "g": 38.9005262697085,
            "h": 38.9032242302915
          },
          "da": {
            "g": -77.03602188029151,
            "h": -77.0333239197085
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "c8295afa228819f7eec819d19c7007dfa3942574",
      "name": "Georgia Brown's",
      "opening_hours": {},
      "photos": [
        {
          "height": 1600,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/109222653044721960894/photos\">Georgia Brown&#39;s</a>"
          ],
          "width": 2400
        }
      ],
      "place_id": "ChIJweENE763t4kRpfaSKMj6tOs",
      "plus_code": {
        "compound_code": "WX28+P3 Washington, District of Columbia, United States",
        "global_code": "87C4WX28+P3"
      },
      "price_level": 2,
      "rating": 4.3,
      "reference": "ChIJweENE763t4kRpfaSKMj6tOs",
      "scope": "GOOGLE",
      "types": [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 1696,
      "vicinity": "950 15th Street Northwest, Washington",
      "html_attributions": []
    },
    {
      "geometry": {
        "location": {
          "lat": 38.911365,
          "lng": -77.03166349999998
        },
        "viewport": {
          "ha": {
            "g": 38.9100340197085,
            "h": 38.9127319802915
          },
          "da": {
            "g": -77.03315473029147,
            "h": -77.03045676970851
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "59313e3b719330313ffb0f8165cf12181a4c761e",
      "name": "Le Diplomate",
      "opening_hours": {},
      "photos": [
        {
          "height": 667,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/107402919288897989681/photos\">Le Diplomate</a>"
          ],
          "width": 1000
        }
      ],
      "place_id": "ChIJgYIki-m3t4kRZImvuN_pp9Q",
      "plus_code": {
        "compound_code": "WX69+G8 Washington, District of Columbia, United States",
        "global_code": "87C4WX69+G8"
      },
      "price_level": 3,
      "rating": 4.6,
      "reference": "ChIJgYIki-m3t4kRZImvuN_pp9Q",
      "scope": "GOOGLE",
      "types": [
        "cafe",
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 2852,
      "vicinity": "1601 14th Street Northwest, Washington",
      "html_attributions": []
    },
    {
      "geometry": {
        "location": {
          "lat": 38.9078402,
          "lng": -77.04210999999998
        },
        "viewport": {
          "ha": {
            "g": 38.9064774197085,
            "h": 38.9091753802915
          },
          "da": {
            "g": -77.04354963029152,
            "h": -77.0408516697085
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "16f51b209507801d3d07682a1d47af379b94ef96",
      "name": "Madhatter",
      "opening_hours": {},
      "photos": [
        {
          "height": 1000,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/113719639442868633401/photos\">Ashley Hughes</a>"
          ],
          "width": 1500
        }
      ],
      "place_id": "ChIJWZL8dce3t4kR8dQsbgQBnm0",
      "plus_code": {
        "compound_code": "WX55+45 Washington, District of Columbia, United States",
        "global_code": "87C4WX55+45"
      },
      "price_level": 2,
      "rating": 4,
      "reference": "ChIJWZL8dce3t4kR8dQsbgQBnm0",
      "scope": "GOOGLE",
      "types": [
        "bar",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 1326,
      "vicinity": "1319 Connecticut Avenue Northwest, Washington",
      "html_attributions": []
    },
    {
      "geometry": {
        "location": {
          "lat": 38.9009528,
          "lng": -77.03864069999997
        },
        "viewport": {
          "ha": {
            "g": 38.8996411197085,
            "h": 38.9023390802915
          },
          "da": {
            "g": -77.03988428029152,
            "h": -77.0371863197085
          }
        }
      },
      "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
      "id": "95b2b0a2bd0fdea7687bb9c8340216abd130998b",
      "name": "Equinox Restaurant",
      "opening_hours": {},
      "photos": [
        {
          "height": 808,
          "html_attributions": [
            "<a href=\"https://maps.google.com/maps/contrib/114488018154359375079/photos\">Equinox Restaurant</a>"
          ],
          "width": 1440
        }
      ],
      "place_id": "ChIJt6jHBLy3t4kRI2hxAOiO8fw",
      "plus_code": {
        "compound_code": "WX26+9G Washington, District of Columbia, United States",
        "global_code": "87C4WX26+9G"
      },
      "price_level": 3,
      "rating": 4.5,
      "reference": "ChIJt6jHBLy3t4kRI2hxAOiO8fw",
      "scope": "GOOGLE",
      "types": [
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
      ],
      "user_ratings_total": 381,
      "vicinity": "818 Connecticut Avenue Northwest, Washington",
      "html_attributions": []
    }
  ];
}

export default App;
