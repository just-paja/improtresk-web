import PropTypes from 'prop-types';
import React from 'react';

const Capacity = ({
  reserved,
  fullyAssigned,
  fullyReserved,
  freeSpots,
}) => {
  if (fullyAssigned) {
    return <span>Plně obsazeno</span>;
  }

  if (fullyReserved) {
    return <span>{reserved} dočasných rezervací</span>;
  }

  return (
    <span>{freeSpots} volných míst, {reserved} dočasných rezervací</span>
  );
};

Capacity.propTypes = {
  freeSpots: PropTypes.number,
  fullyAssigned: PropTypes.bool,
  fullyReserved: PropTypes.bool,
  reserved: PropTypes.number,
};

Capacity.defaultProps = {
  freeSpots: 0,
  fullyAssigned: false,
  fullyReserved: false,
  reserved: 0,
};

export default Capacity;
