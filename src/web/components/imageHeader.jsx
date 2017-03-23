import classnames from 'classnames';
import React, { PropTypes } from 'react';

import styles from './imageHeader.css';

const ImageHeader = ({ className, cover, image }) => (
  <div
    className={classnames(styles.header, className, {
      [styles.cover]: cover,
    })}
    style={{ backgroundImage: `url(${image})` }}
  >
    <img src={image} alt="" className={styles.image} />
  </div>
);

ImageHeader.propTypes = {
  className: PropTypes.string,
  cover: PropTypes.bool,
  image: PropTypes.string.isRequired,
};

ImageHeader.defaultProps = {
  className: null,
  cover: false,
};

export default ImageHeader;
