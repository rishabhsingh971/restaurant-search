import React from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMap from './components/GoogleMap';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: null,
      markers: null,
    }
  }

  render() {
    return (
      <div className="App">
        <div className="sidebar">
          <header className="header">
            <img src={logo} className="logo" alt="logo" />
            <span className="name">Restaurant Search</span>
          </header>
        </div>
        <GoogleMap
          onResultsUpdate={(restaurants, markers) => this.handleRestaurantsUpdate(restaurants, markers)}
        />
      </div>
    );
  }

  handleRestaurantsUpdate(restaurants, markers) {
    this.setState({
      restaurants,
      markers,
    })
  }
}

export default App;
