import React from 'react';
import Rating from '@material-ui/lab/Rating';

export default class Info extends React.Component {
  render() {
    const place = this.props.place;
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
                  <img className="hotelIcon" src={place.icon} style={{width: '36px'}} alt="hotel icon" />
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
                <td>
                  <Rating
                    name="rating"
                    value={place.rating}
                    precision={0.1}
                    readOnly
                  /></td>
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