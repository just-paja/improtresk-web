import PropTypes from 'prop-types';
import React from 'react';

import Markdown from 'react-markdown';

import Address from '../../components/Address';
import Gallery from '../../components/Gallery';

const LocationItem = ({ address, name, photos, text }) => (
  <div>
    <strong>{name}</strong>
    <br />
    <Address address={address} />
    <Markdown source={text} />
    <Gallery photos={photos} />
  </div>
);

LocationItem.propTypes = {
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  text: PropTypes.string.isRequired,
};

export default LocationItem;
