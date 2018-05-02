import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import BootstrapButton from 'reactstrap/lib/Button';
import PropTypes from 'prop-types';
import React from 'react';

import { Children } from '../proptypes';

import styles from './Button.css';

const Button = ({
  children,
  className,
  disabled,
  icon,
  link,
  loading,
  ...other
}) => (
  <BootstrapButton
    {...other}
    className={classnames(className, styles.buttonSize, {
      [styles.link]: link,
    })}
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
  className: PropTypes.string,
  children: Children,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  link: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  className: null,
  children: null,
  disabled: false,
  icon: 'floppy-o',
  link: false,
  loading: false,
};

export default Button;
