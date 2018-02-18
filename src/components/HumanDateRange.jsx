import PropTypes from 'prop-types';
import React from 'react';

import HumanDate from './HumanDate';

const HumanDateRange = ({ end, start }) => (
  <span>
    <HumanDate date={start} showYear={false} />
    {' '}-{' '}
    <HumanDate date={end} />
  </span>
);

HumanDateRange.propTypes = {
  end: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
};

export default HumanDateRange;
