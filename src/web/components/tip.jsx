import Gallery from 'react-photo-gallery';
import Markdown from 'react-markdown';
import React, { PropTypes } from 'react';

const Tip = ({ name, text, photos }) => (
  <div>
    <h2>{name}</h2>
    <div>
      <Markdown source={text} />
    </div>
    <Gallery
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
  </div>
);

Tip.propTypes = {
  name: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  text: PropTypes.string.isRequired,
};

export default Tip;
