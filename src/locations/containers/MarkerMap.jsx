import React from 'react';

import { connect } from 'react-redux';

import MarkerMap from '../components/MarkerMap';
import ResourceLoader from '../../components/ResourceLoader';

const mapStateToProps = () => ({
  googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyABnfkdNP9H-wCCshO_ZRYxvGoCEozHxzg',
  loadingElement: <ResourceLoader />,
  containerElement: <div style={{ height: '400px' }} />,
  mapElement: <div style={{ height: '100%' }} />,
});

export default connect(mapStateToProps)(MarkerMap);
