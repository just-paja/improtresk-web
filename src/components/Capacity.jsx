import PropTypes from 'prop-types';
import React from 'react';

import Message from '../containers/Message';

const Capacity = ({
  reserved,
  fullyAssigned,
  fullyReserved,
  freeSpots,
}) => {
  if (fullyAssigned) {
    return <Message name="capacity.full" />;
  }

  if (fullyReserved) {
    return <Message name="capacity.fullyReserved" data={{ reserved }} />;
  }

  if (!reserved) {
    return <Message name="capacity.freeSpots" data={{ freeSpots }} />;
  }

  return <Message name="capacity.freeSpotsAndReservations" data={{ freeSpots, reserved }} />;
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
