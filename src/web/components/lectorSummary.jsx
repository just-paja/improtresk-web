import React, { PropTypes } from 'react';
import Markdown from 'react-markdown';

import Gallery from './gallery';

const LectorSummary = ({ name, role, about, photos }) => (
  <div>
    <h2>{name}</h2>
    {role}
    <Markdown source={about} />
    <Gallery photos={photos} />
  </div>
);

LectorSummary.propTypes = {
  about: PropTypes.string,
  name: PropTypes.string.isRequired,
  role: PropTypes.string,
  photos: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
  })).isRequired,
};

LectorSummary.defaultProps = {
  about: null,
  role: null,
};

export default LectorSummary;
