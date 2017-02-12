import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

const LectorListSummary = ({ name, role }) => (
  <li>
    <FontAwesome name="user" />
    {' '}
    <b>{role}:</b>
    {' '}
    {name}
  </li>
);

LectorListSummary.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

export default LectorListSummary;
