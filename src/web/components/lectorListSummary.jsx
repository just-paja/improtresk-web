import React, { PropTypes } from 'react';
import FontAwesome from 'react-fontawesome';

const LectorListSummary = ({ name, position }) => (
  <li>
    <FontAwesome name="user" />
    {' '}
    <b>{position}:</b>
    {' '}
    {name}
  </li>
);

LectorListSummary.propTypes = {
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};

export default LectorListSummary;
