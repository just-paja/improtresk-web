import React from 'react';

import { connect } from 'react-redux';

import { getLocationMarkers, getLocationListProgress } from '../selectors';
import { requireLocationList } from '../actions';

import mapProgress from '../../containers/mapProgress';
import MarkerMap from '../components/MarkerMap';
import ResourceLoader from '../../components/ResourceLoader';

const mapStateToProps = state => ({
  containerElement: <div style={{ height: '400px' }} />,
  googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyABnfkdNP9H-wCCshO_ZRYxvGoCEozHxzg',
  loadingElement: <ResourceLoader />,
  mapElement: <div style={{ height: '100%' }} />,
  markers: getLocationMarkers(state),
});

export default mapProgress(connect(mapStateToProps)(MarkerMap), {
  progressSelector: getLocationListProgress,
  onResourceChange: requireLocationList,
});
