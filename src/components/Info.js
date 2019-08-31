import React from 'react';
import Restaurant from './Restaurant';

export default function Info({place}) {
  return (
    <div id="info-content">
      <Restaurant restaurant={place} />
    </div>
  )
}