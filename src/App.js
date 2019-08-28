import React from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleMap from './components/GoogleMap';

function App() {
  return (
    <div className="App">
      <div className="sidebar">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <span className="name">Restaurant Search</span>
        </header>
      </div>
      <GoogleMap />
    </div>
  );
}

export default App;
