import React, { PropTypes } from 'react';
import ReactGallery from 'react-photo-gallery';

const Gallery = ({ photos, ...other }) => (
  <ReactGallery
    {...other}
    photos={photos.map(photo => ({
      ...photo,
      src: photo.image,
      aspectRatio: photo.width / photo.height,
      lightboxImage: {
        src: photo.image,
        caption: photo.caption,
      },
    }))}
  />
);

Gallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Gallery;
