import React, { PropTypes } from 'react';

import {
  GoogleMapLoader,
  GoogleMap,
  Marker,
} from 'react-google-maps';

import styles from './markerMap.css';

const MarkerMap = ({ center, markers, zoom }) => (
  <div className={styles.markerMap}>
    <GoogleMapLoader
      containerElement={
        <div className={styles.markerMapContainer} />
      }
      googleMapElement={
        <GoogleMap
          defaultZoom={zoom}
          defaultCenter={center}
        >
          {markers.map(({ id, lat, lng }) => (
            <Marker
              key={id}
              position={{
                lat, lng,
              }}
            />
          ))}
        </GoogleMap>
      }
    />
  </div>
);

MarkerMap.propTypes = {
  center: PropTypes.object,
  markers: PropTypes.arrayOf(PropTypes.object).isRequired,
  zoom: PropTypes.number,
};

MarkerMap.defaultProps = {
  center: {
    lat: 49.445356,
    lng: 14.365178,
  },
  zoom: 8,
};

export default MarkerMap;
