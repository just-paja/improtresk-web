import React, { PropTypes } from 'react';

import styles from './imageHeader.css';

const ImageHeader = ({ image }) => (
  <div className={styles.header} style={{ backgroundImage: image }}>
    <img src={image} alt="" className={styles.image} />
  </div>
);

ImageHeader.propTypes = {
  image: PropTypes.string.isRequired,
};

export default ImageHeader;
