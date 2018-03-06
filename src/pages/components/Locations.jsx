import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import LocationItem from '../../locations/components/LocationItem';
import MarkerMap from '../../locations/containers/MarkerMap';
import Message from '../../containers/Message';
import TextLocations from '../../texts/containers/TextLocations';
import ObjectList from '../../components/ObjectList';

const Locations = ({ markers, translate }) => (
  <Container>
    <Helmet
      title={translate('pages.locations')}
      meta={[
        { property: 'og:title', content: translate('pages.locations') },
      ]}
    />
    <h1><Message name="pages.locations" /></h1>
    <TextLocations skipFirstHeading />
    <ObjectList
      data={markers}
      Component={LocationItem}
    />
    <hr />
    <MarkerMap markers={markers} />
  </Container>
);

Locations.propTypes = {
  markers: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  })).isRequired,
  translate: PropTypes.func.isRequired,
};

export default Locations;
