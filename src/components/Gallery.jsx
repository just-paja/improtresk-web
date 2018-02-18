import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import ReactGallery from 'react-photo-gallery';

export default class Gallery extends Component {
  constructor() {
    super();

    this.state = { lightbox: false };
    this.handlePhotoClick = this.handlePhotoClick.bind(this);
    this.handleLightboxClose = this.handleLightboxClose.bind(this);
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }

  handleLightboxClose() {
    this.setState({ lightbox: false });
  }

  handlePhotoClick(index, e) {
    e.preventDefault();
    this.setState({ image: index, lightbox: true });
  }

  prev() {
    this.setState({ image: this.state.image - 1 });
  }

  next() {
    this.setState({ image: this.state.image + 1 });
  }

  render() {
    const { photos, ...other } = this.props;
    const photosMapped = photos.map(photo => ({
      caption: photo.caption,
      src: photo.image,
      height: photo.height,
      width: photo.width,
      aspectRatio: photo.width / photo.height,
    }));
    return (
      <div>
        <ReactGallery
          {...other}
          onClickPhoto={this.handlePhotoClick}
          photos={photosMapped}
        />
        <Lightbox
          images={photosMapped}
          backdropClosesModal
          onClose={this.handleLightboxClose}
          onClickPrev={this.prev}
          onClickNext={this.next}
          currentImage={this.state.image}
          isOpen={this.state.lightbox}
        />
      </div>
    );
  }
}

Gallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
