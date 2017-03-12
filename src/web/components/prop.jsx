import FontAwesome from 'react-fontawesome';
import React, { PropTypes } from 'react';

const Prop = ({ children, icon, label }) => (
  children ? (
    <li>
      {icon ? <FontAwesome name={icon} /> : null}
      {icon ? ' ' : null}
      {label}:{' '}
      {children}
    </li>
  ) : null
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
