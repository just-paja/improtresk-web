import React, { PropTypes } from 'react';

import Markdown from 'react-markdown';

import Address from './address';
import Gallery from './gallery';

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
