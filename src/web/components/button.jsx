import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import BootstrapButton from 'react-bootstrap/lib/Button';
import React, { PropTypes } from 'react';

import styles from './button.css';

const Button = ({ children, disabled, icon, loading, ...other }) => (
  <BootstrapButton
    {...other}
    disabled={loading || disabled}
  >
    <FontAwesome
      className={classnames(styles.buttonFa, { 'fa-spin': loading })}
      name={loading ? 'circle-o-notch' : icon}
    />
    {children}
  </BootstrapButton>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  children: null,
  disabled: false,
  icon: 'floppy-o',
  loading: false,
};

export default Button;
