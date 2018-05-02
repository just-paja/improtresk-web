import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

import { Children } from '../proptypes';

const Prop = ({ children, icon, label }) => (
  children ? (
    <li>
      {icon ? <FontAwesome className="fa-fw" name={icon} /> : null}
      {icon ? ' ' : null}
      {label ? <b>{label}:</b> : null}
      {label ? ' ' : null}
      {children}
    </li>
  ) : null
);

Prop.propTypes = {
  children: Children,
  icon: PropTypes.string,
  label: PropTypes.node,
};

Prop.defaultProps = {
  children: null,
  icon: null,
  label: null,
};

export default Prop;
