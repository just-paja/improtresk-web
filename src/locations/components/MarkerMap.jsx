import PropTypes from 'prop-types';
import React from 'react';

import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from 'react-google-maps';

export const MarkerMapComponent = ({ center, markers, zoom }) => (
  <GoogleMap
    defaultZoom={zoom}
    defaultCenter={center}
  >
    {markers.map(({ id, lat, lng }) => (
      <Marker
        key={id}
        position={{ lat, lng }}
      />
    ))}
  </GoogleMap>
);

MarkerMapComponent.propTypes = {
  center: PropTypes.object,
  markers: PropTypes.arrayOf(PropTypes.object).isRequired,
  zoom: PropTypes.number,
};

MarkerMapComponent.defaultProps = {
  center: {
    lat: 49.445356,
    lng: 14.365178,
  },
  zoom: 8,
};

export default withScriptjs(withGoogleMap(MarkerMapComponent));
