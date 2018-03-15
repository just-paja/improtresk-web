import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import { Photo } from '../proptypes';

const HelmetPhotos = ({ photos }) => (
  <Helmet>
    {photos.reduce((data, photo) => ([
      ...data,
      <meta key={photo.src} name="og:image" content={photo.src} />,
      <meta key={`height:${photo.src}`} name="og:image:height" content={photo.height} />,
      <meta key={`width:${photo.src}`} name="og:image:width" content={photo.width} />,
    ]), [])}
  </Helmet>
);

HelmetPhotos.propTypes = {
  photos: PropTypes.arrayOf(Photo).isRequired,
};

export default HelmetPhotos;
