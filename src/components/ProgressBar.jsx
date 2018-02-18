import classnames from 'classnames';
import Progress from 'reactstrap/lib/Progress';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './ProgressBar.css';

const ProgressBar = ({ activeRequests, local, ...other }) => (
  <Progress
    className={classnames(styles.appProgressBar, {
      [styles.fixed]: !local,
    })}
    value={activeRequests > 0 ? 100 / (activeRequests + 1) : 100}
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
