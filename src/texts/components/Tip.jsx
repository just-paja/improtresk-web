import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import React from 'react';

import Gallery from '../../components/Gallery';

const Tip = ({ name, text, photos }) => (
  <div>
    <h2>{name}</h2>
    <div>
      <Markdown source={text} />
    </div>
    <Gallery photos={photos} />
  </div>
);

Tip.propTypes = {
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  text: PropTypes.string.isRequired,
};

export default Tip;
