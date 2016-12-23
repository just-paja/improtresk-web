import Markdown from 'react-markdown';
import React, { PropTypes } from 'react';

import Gallery from './gallery';

const Tip = ({ name, text, photos }) => (
  <div>
    <h2>{name}</h2>
    <div>
      <Markdown source={text} />
    </div>
    <Gallery photos={photos} onClose={() => {}} />
  </div>
);

Tip.propTypes = {
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  text: PropTypes.string.isRequired,
};

export default Tip;
