import React, { PropTypes } from 'react';

import HumanTime from './humanTime';

const HumanTimeRange = ({ end, start }) => (
  <span>
    <HumanTime date={start} />
    {' '}-{' '}
    <HumanTime date={end} />
  </span>
);

HumanTimeRange.propTypes = {
  end: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
};

export default HumanTimeRange;
