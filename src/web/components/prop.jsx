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
  ]),
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
};

Prop.defaultProps = {
  children: null,
  icon: null,
};

export default Prop;
