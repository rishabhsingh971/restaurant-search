import React from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMap from './components/GoogleMap';
import Restaurants from './components/Restaurants';
import {Grid} from '@material-ui/core';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: null,
      markers: null,
    }

    this.handleRestaurantClick = this.handleRestaurantClick.bind(this);
    this.handleRestaurantsUpdate = this.handleRestaurantsUpdate.bind(this);
  }

  render() {
    return (
      <Grid container spacing={0} style={{height: '100vh'}}>
        <Grid item xs={3} style={{maxHeight: '100%', display: 'flex', flexDirection: 'column'}}>
          <Grid container className="header">
            <img className="logo" xs={3} src={logo} alt="logo" />
            <span className="name" xs={9}>Restaurant Search</span>
          </Grid>
          <Restaurants
            restaurants={this.state.restaurants}
            onClick={this.handleRestaurantClick}
          />
        </Grid>
        <Grid item xs={9}>
          <GoogleMap
            onResultsUpdate={this.handleRestaurantsUpdate}
          />
        </Grid>
      </Grid>
    );
  }

  handleRestaurantClick(index) {
    window.google.maps.event.trigger(this.state.markers[index], 'click');
  }

  handleRestaurantsUpdate(restaurants, markers) {
    this.setState({
      restaurants,
      markers,
    })
  }
}

export default App;
