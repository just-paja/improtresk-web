import classnames from 'classnames';
import BootstrapProgressBar from 'react-bootstrap/lib/ProgressBar';
import React, { PropTypes } from 'react';

import styles from './progressBar.css';

const ProgressBar = ({ activeRequests, local, ...other }) => (
  <BootstrapProgressBar
    active={activeRequests > 0}
    className={classnames(styles.appProgressBar, {
      [styles.fixed]: !local,
    })}
    now={activeRequests > 0 ? 100 / (activeRequests + 1) : 100}
    striped={false}
    {...other}
  />
);

ProgressBar.propTypes = {
  activeRequests: PropTypes.number,
  local: PropTypes.bool,
};

ProgressBar.defaultProps = {
  activeRequests: 0,
  local: false,
};

export default ProgressBar;
