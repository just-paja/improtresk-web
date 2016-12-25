import FontAwesome from 'react-fontawesome';
import React, { PropTypes } from 'react';

const Prop = ({ children, icon, label }) => (
  <li>
    <FontAwesome name={icon} /> {label}:{' '}
    {children}
  </li>
);

Prop.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Prop;
