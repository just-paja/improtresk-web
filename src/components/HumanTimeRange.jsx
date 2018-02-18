import PropTypes from 'prop-types';
import React from 'react';

import HumanTime from './HumanTime';

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
