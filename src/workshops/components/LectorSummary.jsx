import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';
import Markdown from 'react-markdown';

import Gallery from '../../components/Gallery';

const LectorSummary = ({ name, position, about, photos }) => (
  <div>
    <Helmet
      meta={[
        ...photos.reduce((data, photo) => ([
          ...data,
          {
            property: 'og:image',
            content: photo.image,
          },
          {
            property: 'og:image:height',
            content: photo.height,
          },
          {
            property: 'og:image:width',
            content: photo.width,
          },
        ]), []),
      ]}
    />
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
