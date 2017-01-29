import Grid from 'react-bootstrap/lib/Grid';
import React, { PropTypes } from 'react';

import styles from './container.css';

const Container = ({ children, ...other }) => (
  <div className={styles.appContent}>
    <Grid {...other}>{children}</Grid>
  </div>
);

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

Container.defaultProps = {
  children: null,
};

export default Container;
