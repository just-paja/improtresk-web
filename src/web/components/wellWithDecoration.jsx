import React, { PropTypes } from 'react';
import Well from 'react-bootstrap/lib/Well';

import ImageHeader from './imageHeader';

import styles from './wellWithDecoration.css';

const WellWithDecoration = ({ children, image }) => (
  <div>
    <Well className={styles.well}>
      {children}
    </Well>
    <ImageHeader image={image} />
  </div>
);

WellWithDecoration.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

WellWithDecoration.defaultProps = {
  children: null,
};

export default WellWithDecoration;
