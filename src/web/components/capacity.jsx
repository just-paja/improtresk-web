import React, { PropTypes } from 'react';

const Capacity = ({ available, blockedMessage, capacity }) => {
  if (available === null) {
    return <span>{capacity}</span>;
  }

  if (available === 0) {
    return <span>{blockedMessage}</span>;
  }

  return <span>{available} z {capacity}</span>;
};

Capacity.propTypes = {
  available: PropTypes.number,
  blockedMessage: PropTypes.string,
  capacity: PropTypes.number.isRequired,
};

Capacity.defaultProps = {
  available: false,
  blockedMessage: 'obsazeno',
};

export default Capacity;
