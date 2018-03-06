import PropTypes from 'prop-types';
import React from 'react';

import { MultiLingualDescription } from '../../proptypes';

import Address from '../../components/Address';
import Gallery from '../../components/Gallery';
import MultiLingualMarkdown from '../../containers/MultiLingualMarkdown';

const LocationItem = ({ address, name, photos, description }) => (
  <div>
    <strong>{name}</strong>
    <br />
    <Address address={address} />
    <MultiLingualMarkdown texts={description} />
    <Gallery photos={photos} />
  </div>
);

LocationItem.propTypes = {
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  description: MultiLingualDescription.isRequired,
};

export default LocationItem;
