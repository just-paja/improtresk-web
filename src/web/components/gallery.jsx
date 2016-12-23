import React, { PropTypes } from 'react';
import ReactGallery from 'react-photo-gallery';

const Gallery = ({ photos, ...other }) => (
  <ReactGallery
    {...other}
    photos={photos.map(photo => ({
      ...photo,
      aspectRatio: photo.width / photo.height,
      lightboxImage: {
        src: photo.src,
        caption: photo.caption,
      },
    }))}
    onClose={() => {}}
  />
);

Gallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Gallery;
