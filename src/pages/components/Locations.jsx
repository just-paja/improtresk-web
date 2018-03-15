import Helmet from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import LocationList from '../../locations/containers/LocationList';
import MarkerMap from '../../locations/containers/MarkerMap';
import Message from '../../containers/Message';
import TextLocations from '../../texts/containers/TextLocations';

const Locations = ({ translate }) => (
  <Container>
    <Helmet
      title={translate('pages.locations')}
      meta={[
        { property: 'og:title', content: translate('pages.locations') },
      ]}
    />
    <h1><Message name="pages.locations" /></h1>
    <TextLocations skipFirstHeading />
    <LocationList />
    <hr />
    <MarkerMap />
  </Container>
);

Locations.propTypes = {
  translate: PropTypes.func.isRequired,
};

export default Locations;
