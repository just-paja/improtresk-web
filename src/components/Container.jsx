import BSContainer from 'reactstrap/lib/Container';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Container.css';

const Container = ({ children, ...other }) => (
  <div className={styles.appContent}>
    <BSContainer {...other}>{children}</BSContainer>
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
