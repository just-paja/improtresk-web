import BootstrapProgressBar from 'react-bootstrap/lib/ProgressBar';
import React, { PropTypes } from 'react';

import styles from './progressBar.css';

const ProgressBar = ({ activeRequests }) => (
  <BootstrapProgressBar
    active={activeRequests > 0}
    className={styles.appProgressBar}
    now={activeRequests > 0 ? 100 / (activeRequests + 1) : 100}
    striped={false}
  />
);

ProgressBar.propTypes = {
  activeRequests: PropTypes.number,
};

ProgressBar.defaultProps = {
  activeRequests: 0,
};

export default ProgressBar;
