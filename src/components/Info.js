import React from 'react';

export default class Info extends React.Component {
  render() {
    const place = this.props.place;
    let ratingHtml = '';
    if (place && place.rating) {
      // Assign a five-star rating to the restaurant, using a black star ('&#10029;')
      // to indicate the rating the restaurant has earned, and a white star ('&#10025;')
      // for the rating points not achieved.
      for (let i = 0; i < 5; i++) {
        if (place.rating < (i + 0.5)) {
          ratingHtml += '&#10025;';
        } else {
          ratingHtml += '&#10029;';
        }
      }
    }
    // The regexp isolates the first part of the URL (domain plus subdomain)
    // to give a short URL for displaying in the info window.
    let fullUrl;
    let website;
    if (place && place.website) {
      fullUrl = place.website;
      website = /^https?:\/\/.+?\//.exec(place.website);
      if (website === null) {
        website = 'http://' + place.website + '/';
        fullUrl = website;
      }
    }

    return (
      <div id="info-content" style={{display: place ? '' : 'None'}}>
        {place &&
          <table>
            <tbody>
              <tr className="iw_table_row">
                <td className="iw_table_icon">
                  <img className="hotelIcon" src={place.icon} alt="hotel icon" />
                </td>
                <td>
                  <b><a href={place.url}>{place.name}</a></b>
                </td>
              </tr>
              <tr className="iw_table_row">
                <td className="iw_attribute_name">Address:</td>
                <td>{place.vicinity}</td>
              </tr>
              <tr
                className="iw_table_row"
                style={{display: place.formatted_phone_number ? '' : 'None'}}
              >
                <td className="iw_attribute_name">Telephone:</td>
                <td>{place.formatted_phone_number}</td>
              </tr>
              <tr
                className="iw_table_row"
                style={{display: place.rating ? '' : 'None'}}
              >
                <td className="iw_attribute_name">Rating:</td>
                <td>{ratingHtml}</td>
              </tr>
              <tr
                className="iw_table_row"
                style={{display: place.website ? '' : 'None'}}
              >
                <td className="iw_attribute_name">Website:</td>
                <td><a href={fullUrl}>{website}</a></td>
              </tr>
            </tbody>
          </table>
        }
      </div>
    )
  }
}