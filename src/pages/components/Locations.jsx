import Helmet from 'react-helmet';
import Markdown from 'react-markdown';
import React from 'react';
import PropTypes from 'prop-types';

import Container from '../../components/Container';
import LocationItem from '../../locations/components/LocationItem';
import MarkerMap from '../../locations/containers/MarkerMap';
import Message from '../../containers/Message';
import ObjectList from '../../components/ObjectList';

const Locations = ({ intro, markers, translate }) => (
  <Container>
    <Helmet
      title={translate('pages.locations')}
      meta={[
        { property: 'og:title', content: translate('pages.locations') },
      ]}
    />
    <h1>
      <Message name="pages.locations" />
    </h1>
    <Markdown source={intro} />
    <ObjectList
      data={markers}
      Component={LocationItem}
    />
    <hr />
    <MarkerMap markers={markers} />
  </Container>
);

Locations.propTypes = {
  intro: PropTypes.string,
  markers: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  })).isRequired,
  translate: PropTypes.func.isRequired,
};

Locations.defaultProps = {
  intro: null,
};

export default Locations;
