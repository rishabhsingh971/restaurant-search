import React from 'react';

export default class Restaurants extends React.Component {
  render() {
    let restaurants = this.props.restaurants;
    if (!restaurants) return null;
    restaurants = restaurants.map((restaurant, i) => {
      const markerLetter = String.fromCharCode('A'.charCodeAt(0) + (i % 26));
      const markerIcon = this.MARKER_PATH + markerLetter + '.png';
      return (
        <tr
          style={{backgroundColor: i % 2 === 0 ? '#F0F0F0' : '#FFFFFF'}}
          onClick={() => this.props.onClick(i)}
        >
          <td><img className="placeIcon" src={markerIcon} alt="place icon" /></td>
          <td>{restaurant.name}</td>
        </tr>
      );
    })
    return (
      <div id="listing">
        <table id="resultsTable">
          <tbody id="results">
            {restaurants}
          </tbody>
        </table>
      </div>
    )
  }
}