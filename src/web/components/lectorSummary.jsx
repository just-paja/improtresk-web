import React, { PropTypes } from 'react';
import Markdown from 'react-markdown';

import Gallery from './gallery';

const LectorSummary = ({ name, position, about, photos }) => (
  <div>
    <h2>
      {name}<br />
      <small>{position}</small>
    </h2>

    <Markdown source={about} />
    <Gallery photos={photos} />
  </div>
);

LectorSummary.propTypes = {
  about: PropTypes.string,
  name: PropTypes.string.isRequired,
  position: PropTypes.string,
  photos: PropTypes.arrayOf(PropTypes.shape({
    image: PropTypes.string,
  })).isRequired,
};

LectorSummary.defaultProps = {
  about: null,
  position: null,
};

export default LectorSummary;
